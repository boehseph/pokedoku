import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

interface Constraint {
  type: string;
  name: string;
  id: number;
}

function App() {
  const [grid, setGrid] = useState<{ rows: Constraint[], cols: Constraint[] } | null>(null);

  useEffect(() => {
    // Fetch the random grid when the page loads
    axios.get('http://localhost:5000/api/new-game')
      .then(res => setGrid(res.data))
      .catch(err => console.error(err));
  }, []);

  if (!grid) return <div>Loading PokéDoku...</div>;

  return (
    <div className="game-container">
      <h1>PokéDoku</h1>
      <div className="grid-wrapper">
        {/* Top-Left Empty Corner */}
        <div className="corner-cell"></div>

        {/* Column Headers */}
        {grid.cols.map(col => <div key={col.id} className="header-cell col-header">{col.name}</div>)}

        {/* The Rows */}
        {grid.rows.map((row) => (
          <React.Fragment key={row.id}>
            {/* Row Header */}
            <div className="header-cell row-header">{row.name}</div>
            
            {/* 3 Playable Cells for this row */}
            <div className="play-cell" onClick={() => console.log(`Clicked Row ${row.name}`)}></div>
            <div className="play-cell"></div>
            <div className="play-cell"></div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default App;