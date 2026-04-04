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

// Helper to check if a Pokemon exists for TWO specific constraints
async function doesPokemonExist(c1, c2) {
  const sql = `
    SELECT COUNT(*) as count 
    FROM (${getSubQuery(c1)}) a 
    INNER JOIN (${getSubQuery(c2)}) b ON a.pokemon_id = b.pokemon_id
  `;

  return new Promise((resolve) => {
    db.get(sql, [], (err, row) => resolve(row?.count > 0));
  });
}

// Helper to check if a cell is possible
// This works for Types, but can be expanded for Regions/Gens later
async function isCellValid(rowId, colId) {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT COUNT(*) as count 
      FROM POKEMON_TYPE pt1
      JOIN POKEMON_TYPE pt2 ON pt1.pokemon_id = pt2.pokemon_id
      WHERE pt1.type_id = ? AND pt2.type_id = ?
    `;
    db.get(sql, [rowId, colId], (err, row) => {
      if (err) reject(err);
      resolve(row.count > 0);
    });
  });
}

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

    while (!isValid) {
      // Pick 6 unique random constraints from the big pool
      const shuffled = allOptions.sort(() => 0.5 - Math.random());
      rows = shuffled.slice(0, 3);
      cols = shuffled.slice(3, 6);

      // Check all 9 intersections
      let possible = true;
      for (let r of rows) {
        for (let c of cols) {
          if (!(await doesPokemonExist(r, c))) {
            possible = false; 
            break;
          }
        }
        if (!possible) break;
      }
      if (possible) isValid = true;
    }

    res.json({ rows, cols });
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