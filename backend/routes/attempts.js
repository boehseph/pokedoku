const express = require('express');
const { db } = require('../database');

const router = express.Router();

router.get('/user-attempts/:userId', (req, res) => {
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

router.get('/attempt-details/:attemptId', (req, res) => {
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

router.post('/save-attempt', (req, res) => {
  const { user_id, puzzle_id, guesses, score, did_complete } = req.body;

  const attemptQuery = `
    INSERT INTO ATTEMPT (user_id, puzzle_id, guesses_remaining, did_complete, score)
    VALUES (?, ?, ?, ?, ?)`;

  db.run(attemptQuery, [user_id, puzzle_id, 0, did_complete, score], function (err) {
    if (err) return res.status(500).json({ error: err.message });

    const attemptId = this.lastID;

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

    if (statements.length === 0) {
      return res.json({ success: true, attemptId });
    }

    let completed = 0;
    statements.forEach((params) => {
      db.run(cellQuery, params, () => {
        completed++;
        if (completed === statements.length) {
          res.json({ success: true, attemptId });
        }
      });
    });
  });
});

module.exports = router;
