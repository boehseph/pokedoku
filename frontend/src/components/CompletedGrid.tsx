import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CompletedGrid = ({ attemptId }: { attemptId: number }) => {
  const [cells, setCells] = useState<any[]>([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/attempt-details/${attemptId}`)
      .then(res => setCells(res.data));
  }, [attemptId]);

  // Helper to get sprite (Same as GamePage)
  const getSprite = (dex: number) => 
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/emerald/${dex}.png`;

  return (
    <div className="mini-grid">
      {[1, 2, 3].map(row => (
        <div key={row} className="mini-row">
          {[1, 2, 3].map(col => {
            const pokemon = cells.find(c => c.row_pos === row && c.col_pos === col);
            return (
              <div key={col} className="mini-cell">
                {pokemon && <img src={getSprite(pokemon.dex_number)} alt={pokemon.name} title={pokemon.name} />}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default CompletedGrid;
