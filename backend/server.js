const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const PORT = 5000;

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
  db.all('SELECT name FROM POKEMON LIMIT 20', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});