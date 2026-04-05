const express = require('express');
const { db } = require('../database');

const router = express.Router();

router.post('/signup', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Missing credentials' });
  }

  const query = 'INSERT INTO USER (username, password) VALUES (?, ?)';

  db.run(query, [username, password], function (err) {
    if (err) {
      if (err.message.includes('UNIQUE constraint failed')) {
        return res.status(400).json({ success: false, message: 'Username already taken.' });
      }
      console.error('Signup Error:', err.message);
      return res.status(500).json({ success: false, message: 'Database error during signup.' });
    }
    res.json({ success: true, userId: this.lastID });
  });
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  const query = 'SELECT * FROM USER WHERE username = ? AND password = ?';

  db.get(query, [username, password], (err, row) => {
    if (err) {
      console.error('Login Error:', err.message);
      return res.status(500).json({ success: false, message: 'Database error during login.' });
    }

    if (row) {
      res.json({
        success: true,
        user: { id: row.user_id, username: row.username },
      });
    } else {
      res.status(401).json({ success: false, message: 'Invalid username or password.' });
    }
  });
});

module.exports = router;
