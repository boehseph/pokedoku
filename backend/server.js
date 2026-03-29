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
  db.all('SELECT name FROM POKEMON LIMIT 5', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// GET /api/new-game
app.get('/api/new-game', (req, res) => {
  // This query picks 6 random types/regions/gens to be constraints
  const query = `
    SELECT 'TYPE' as type, name, type_id as id FROM TYPE ORDER BY RANDOM() LIMIT 6;
  `;

  db.all(query, [], (err, rows) => {
    if (err) return res.status(500).json(err);
    
    // Split 6 random constraints into 3 rows and 3 columns
    const response = {
      rows: rows.slice(0, 3),
      cols: rows.slice(3, 6)
    };
    res.json(response);
  });
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