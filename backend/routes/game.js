const express = require('express');
const { db, dbAll, dbGet } = require('../database');
const { getSubQuery, getValidPokemonName, checkPokemonMatchesConstraint } = require('../puzzleLogic');

const router = express.Router();

router.get('/new-game', async (req, res) => {
  try {
    const types = await dbAll("SELECT 'TYPE' as kind, type_id as id, name FROM TYPE");
    const regions = await dbAll("SELECT 'REGION' as kind, region_id as id, name FROM REGION");
    const abilities = await dbAll("SELECT 'ABILITY' as kind, ability_id as id, name FROM ABILITY");
    const evos = await dbAll("SELECT 'EVO' as kind, evo_stage_id as id, name FROM EVO_STAGE");

    const allOptions = [...types, ...regions, ...abilities, ...evos];

    let rows;
    let cols;
    let isValid = false;
    let cheatSheet = [];

    while (!isValid) {
      const shuffled = allOptions.sort(() => 0.5 - Math.random());
      rows = shuffled.slice(0, 3);
      cols = shuffled.slice(3, 6);

      let possible = true;
      cheatSheet = [];

      for (const r of rows) {
        const rowNames = [];
        for (const c of cols) {
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

    if (process.env.NODE_ENV !== 'production') {
      console.log('New puzzle solutions (dev):');
      console.table(cheatSheet);
    }

    db.run('INSERT INTO PUZZLE (is_daily) VALUES (0)', function (err) {
      if (err) return res.status(500).send('Error saving puzzle');

      const puzzle_id = this.lastID;

      const insertConstraint = db.prepare(`
        INSERT INTO PUZZLE_CONSTRAINT (puzzle_id, constraint_id, axis, position)
        VALUES (?, ?, ?, ?)
      `);

      rows.forEach((r, i) => insertConstraint.run(puzzle_id, r.id, 'row', i + 1));
      cols.forEach((c, i) => insertConstraint.run(puzzle_id, c.id, 'column', i + 1));

      insertConstraint.finalize();

      res.json({
        puzzle_id,
        rows,
        cols,
      });
    });
  } catch (err) {
    res.status(500).send('Error generating grid');
  }
});

router.get('/pokemon/search', (req, res) => {
  const query = req.query.q;
  const sql = 'SELECT pokemon_id, dex_number, name FROM POKEMON WHERE name LIKE ? LIMIT 10';

  db.all(sql, [`%${query}%`], (err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
});

router.post('/check-guess', async (req, res) => {
  const { pokemon_id, rowConstraint, colConstraint } = req.body;

  try {
    const matchRow = await checkPokemonMatchesConstraint(pokemon_id, rowConstraint);
    const matchCol = await checkPokemonMatchesConstraint(pokemon_id, colConstraint);

    if (matchRow && matchCol) {
      res.json({ correct: true });
    } else {
      res.json({ correct: false, message: "That Pokémon doesn't fit the criteria!" });
    }
  } catch (err) {
    console.error('check-guess:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/get-solutions', async (req, res) => {
  try {
    const { rows, cols } = req.body;
    const solutionGrid = [[], [], []];

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

        const pokemon = await dbGet(sql, []);
        solutionGrid[i][j] = pokemon || null;
      }
    }
    res.json(solutionGrid);
  } catch (err) {
    console.error('SOLUTIONS ERROR:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
