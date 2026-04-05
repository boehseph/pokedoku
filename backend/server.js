const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const PORT = 5000;

const getSubQuery = (constraint) => {
  switch (constraint.kind) {
    case 'TYPE': 
      return `SELECT pokemon_id FROM POKEMON_TYPE WHERE type_id = ${constraint.id}`;
    case 'REGION': 
      return `SELECT pokemon_id FROM POKEMON WHERE region_id = ${constraint.id}`;
    case 'ABILITY': 
      return `SELECT pokemon_id FROM POKEMON_ABILITY WHERE ability_id = ${constraint.id}`;
    case 'EVO': 
      return `SELECT pokemon_id FROM POKEMON WHERE evo_stage_id = ${constraint.id}`;
    default: 
      return `SELECT pokemon_id FROM POKEMON`;
  }
};

// Middleware
app.use(cors());
app.use(express.json());

// Connect to database
const db = new sqlite3.Database('./pokedoku.db', (err) => {
  if (err) console.error('Database opening error:', err);
  else console.log('Connected to pokedoku.db');
});

// TEST ROUTE: Get all Pokemon names
app.get('/api/pokemon', (req, res) => {
  db.all('SELECT name FROM POKEMON LIMIT 5', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

async function getValidPokemonName(c1, c2) {
  // We join the results of your two subqueries (a and b) 
  // with the POKEMON table (p) to get the name
  const sql = `
    SELECT p.name 
    FROM POKEMON p
    INNER JOIN (${getSubQuery(c1)}) a ON p.pokemon_id = a.pokemon_id
    INNER JOIN (${getSubQuery(c2)}) b ON p.pokemon_id = b.pokemon_id
    LIMIT 1
  `;

  return new Promise((resolve) => {
    db.get(sql, [], (err, row) => {
      if (err) {
        console.error("Query Error:", err);
        resolve(null);
      }
      resolve(row ? row.name : null);
    });
  });
}

app.get('/api/user-attempts/:userId', (req, res) => {
    const query = `
        SELECT a.attempt_id, a.score, p.created_date 
        FROM ATTEMPT a
        JOIN PUZZLE p ON a.puzzle_id = p.puzzle_id
        WHERE a.user_id = ? AND a.did_complete = 1
        ORDER BY p.created_date DESC`;
    
    db.all(query, [req.params.userId], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

app.get('/api/attempt-details/:attemptId', (req, res) => {
    const query = `
        SELECT ac.row_pos, ac.col_pos, p.name, p.dex_number, p.pokemon_id
        FROM ATTEMPT_CELL ac
        JOIN POKEMON p ON ac.pokemon_id = p.pokemon_id
        WHERE ac.attempt_id = ?`;
    
    db.all(query, [req.params.attemptId], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

app.get('/api/new-game', async (req, res) => {
  try {
    // 1. Fetch a pool of possible constraints from all categories
    const pool = [];
    
    const types = await new Promise(r => db.all("SELECT 'TYPE' as kind, type_id as id, name FROM TYPE", (e, rows) => r(rows)));
    const regions = await new Promise(r => db.all("SELECT 'REGION' as kind, region_id as id, name FROM REGION", (e, rows) => r(rows)));
    const abilities = await new Promise(r => db.all("SELECT 'ABILITY' as kind, ability_id as id, name FROM ABILITY", (e, rows) => r(rows)));
    const evos = await new Promise(r => db.all("SELECT 'EVO' as kind, evo_stage_id as id, name FROM EVO_STAGE", (e, rows) => r(rows)));

    const allOptions = [...types, ...regions, ...abilities, ...evos];

    let rows, cols;
    let isValid = false;
    let cheatSheet = [];

    while (!isValid) {
      const shuffled = allOptions.sort(() => 0.5 - Math.random());
      rows = shuffled.slice(0, 3);
      cols = shuffled.slice(3, 6);

      let possible = true;
      cheatSheet = []; // Reset for this attempt

      for (let r of rows) {
        let rowNames = [];
        for (let c of cols) {
          const name = await getValidPokemonName(r, c); 
          if (!name) {
            possible = false;
            break;
          }
          rowNames.push(name);
        }
        if (!possible) break;
        cheatSheet.push(rowNames);
      }
      
      if (possible) isValid = true;
    }

    // --- THE TEST LOG ---
    // This will print a nice 3x3 table in your VS Code / Terminal console
    console.log("\n--- TESTER CHEAT SHEET (SOLUTIONS) ---");
    console.table(cheatSheet);
    console.log("--------------------------------------\n");
    
    // 1. Create the Puzzle record
    db.run("INSERT INTO PUZZLE (is_daily) VALUES (0)", function(err) {
      if (err) return res.status(500).send("Error saving puzzle");
      
      const puzzle_id = this.lastID;

      // 2. Save the constraints so the DB knows what 'Row 1' or 'Col 2' was
      // This is vital if you want to reconstruct the board on the Profile page later!
      const insertConstraint = db.prepare(`
        INSERT INTO PUZZLE_CONSTRAINT (puzzle_id, constraint_id, axis, position) 
        VALUES (?, ?, ?, ?)
      `);

      // Rows
      rows.forEach((r, i) => insertConstraint.run(puzzle_id, r.id, 'row', i + 1));
      // Cols
      cols.forEach((c, i) => insertConstraint.run(puzzle_id, c.id, 'column', i + 1));
      
      insertConstraint.finalize();

      res.json({ 
        puzzle_id, 
        rows, 
        cols 
      });
    });
  } catch (err) {
    res.status(500).send("Error generating grid");
  }
});

app.get('/api/pokemon/search', (req, res) => {
  const query = req.query.q;
  // We search for names starting with or containing the search term
  const sql = "SELECT pokemon_id, dex_number, name FROM POKEMON WHERE name LIKE ? LIMIT 10";
  
  db.all(sql, [`%${query}%`], (err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
});

app.post('/api/check-guess', async (req, res) => {
  const { pokemon_id, rowConstraint, colConstraint } = req.body;

  // We reuse the logic from doesPokemonExist but for a SPECIFIC pokemon_id
  const checkSingle = async (pId, constraint) => {
    let sql = "";
    let params = [pId, constraint.id];

    switch (constraint.kind) {
      case 'TYPE': 
        sql = "SELECT 1 FROM POKEMON_TYPE WHERE pokemon_id = ? AND type_id = ?";
        break;
      case 'REGION': 
        sql = "SELECT 1 FROM POKEMON WHERE pokemon_id = ? AND region_id = ?";
        break;
      case 'ABILITY': 
        sql = "SELECT 1 FROM POKEMON_ABILITY WHERE pokemon_id = ? AND ability_id = ?";
        break;
      case 'EVO': 
        sql = "SELECT 1 FROM POKEMON WHERE pokemon_id = ? AND evo_stage_id = ?";
        break;
    }

    return new Promise(r => db.get(sql, params, (err, row) => r(!!row)));
  };

  const matchRow = await checkSingle(pokemon_id, rowConstraint);
  const matchCol = await checkSingle(pokemon_id, colConstraint);

  if (matchRow && matchCol) {
    res.json({ correct: true });
  } else {
    res.json({ correct: false, message: "That Pokémon doesn't fit the criteria!" });
  }
});

app.post('/api/get-solutions', async (req, res) => {
  try {
    const { rows, cols } = req.body;
    // We create a 3x3 array to hold the answers
    const solutionGrid = [[], [], []];

    // Loop through each cell in the 3x3
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const sql = `
          SELECT p.pokemon_id, p.dex_number, p.name 
          FROM POKEMON p
          WHERE p.pokemon_id IN (
            ${getSubQuery(rows[i])} 
            INTERSECT 
            ${getSubQuery(cols[j])}
          )
          LIMIT 1`;
        
        const pokemon = await new Promise((resolve, reject) => {
          db.get(sql, [], (err, row) => {
            if (err) reject(err);
            resolve(row);
          });
        });
        
        solutionGrid[i][j] = pokemon || null;
      }
    }
    res.json(solutionGrid);
  } catch (err) {
    console.error("SOLUTIONS ERROR:", err); // This will show in your terminal
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/signup', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ success: false, message: "Missing credentials" });
    }

    const query = `INSERT INTO USER (username, password) VALUES (?, ?)`;
    
    db.run(query, [username, password], function(err) {
        if (err) {
            // Check if error is because username already exists
            if (err.message.includes('UNIQUE constraint failed')) {
                return res.status(400).json({ success: false, message: "Username already taken." });
            }
            console.error("Signup Error:", err.message);
            return res.status(500).json({ success: false, message: "Database error during signup." });
        }
        // Success! Return the new user ID
        res.json({ success: true, userId: this.lastID });
    });
});

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    const query = `SELECT * FROM USER WHERE username = ? AND password = ?`;

    db.get(query, [username, password], (err, row) => {
        if (err) {
            console.error("Login Error:", err.message);
            return res.status(500).json({ success: false, message: "Database error during login." });
        }

        if (row) {
            // Found them!
            res.json({ 
                success: true, 
                user: { id: row.user_id, username: row.username } 
            });
        } else {
            // Wrong username or password
            res.status(401).json({ success: false, message: "Invalid username or password." });
        }
    });
});

app.post('/api/save-attempt', (req, res) => {
  console.log("Saving attempt for user:", req.body.user_id);
  const { user_id, puzzle_id, guesses, score, did_complete } = req.body;

  // 1. Insert into ATTEMPT
  const attemptQuery = `
      INSERT INTO ATTEMPT (user_id, puzzle_id, guesses_remaining, did_complete, score)
      VALUES (?, ?, ?, ?, ?)`;

  db.run(attemptQuery, [user_id, puzzle_id, 0, did_complete, score], function(err) {
      if (err) return res.status(500).json({ error: err.message });
      
      const attemptId = this.lastID;
      console.log("New Attempt ID:", attemptId);

      // 2. Insert each cell into ATTEMPT_CELL
      const cellQuery = `
          INSERT INTO ATTEMPT_CELL (attempt_id, row_pos, col_pos, pokemon_id, is_correct)
          VALUES (?, ?, ?, ?, 1)`;

      const statements = [];
      guesses.forEach((row, rowIndex) => {
          row.forEach((pokemon, colIndex) => {
              if (pokemon) {
                  statements.push([attemptId, rowIndex + 1, colIndex + 1, pokemon.pokemon_id]);
              }
          });
      });

      // Simple way to run multiple inserts in SQLite
      let completed = 0;
      statements.forEach(params => {
          db.run(cellQuery, params, () => {
              completed++;
              if (completed === statements.length) {
                  res.json({ success: true, attemptId });
              }
          });
      });
  });
});
