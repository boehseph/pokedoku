import React, { useEffect, useState } from 'react';
import { api } from '../api';
import { getPokemonSpriteUrl } from '../utils/pokemon';

interface AttemptCell {
  row_pos: number;
  col_pos: number;
  name: string;
  dex_number: number;
  pokemon_id: number;
}

const CompletedGrid = ({ attemptId }: { attemptId: number }) => {
  const [cells, setCells] = useState<AttemptCell[]>([]);

  useEffect(() => {
    api
      .get<AttemptCell[]>(`/api/attempt-details/${attemptId}`)
      .then((res) => setCells(res.data));
  }, [attemptId]);

  return (
    <div className="mini-grid">
      {[1, 2, 3].map((row) => (
        <div key={row} className="mini-row">
          {[1, 2, 3].map((col) => {
            const pokemon = cells.find((c) => c.row_pos === row && c.col_pos === col);
            return (
              <div key={col} className="mini-cell">
                {pokemon && (
                  <img
                    src={getPokemonSpriteUrl(pokemon.dex_number)}
                    alt={pokemon.name}
                    title={pokemon.name}
                  />
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default CompletedGrid;
