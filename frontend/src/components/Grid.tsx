import React from 'react';
import type { NewGameResponse, PokemonPick } from '../types';
import './Grid.css';

interface GridProps {
  grid: NewGameResponse;
  guesses: (PokemonPick | null)[][];
  handleCellClick: (row: number, col: number) => void;
  errorCell: { row: number; col: number } | null;
  successCell: { row: number; col: number } | null;
  getPokemonSprite: (dex: number) => string;
}

const Grid: React.FC<GridProps> = ({
  grid,
  guesses,
  handleCellClick,
  errorCell,
  successCell,
  getPokemonSprite,
}) => {
  return (
    <div className="grid-wrapper">
      <div className="corner-cell"></div>
      {grid.cols.map((col, index) => (
        <div key={`col-${col.id}-${index}`} className="header-cell">
          {col.name}
        </div>
      ))}

      {grid.rows.map((row, rowIndex) => (
        <React.Fragment key={`row-group-${row.id}`}>
          <div className="header-cell">{row.name}</div>
          {[0, 1, 2].map((colIndex) => {
            const pokemon = guesses[rowIndex][colIndex];
            const isError = errorCell?.row === rowIndex && errorCell?.col === colIndex;
            const isSuccess = successCell?.row === rowIndex && successCell?.col === colIndex;

            return (
              <div
                key={`cell-${rowIndex}-${colIndex}`}
                className={`play-cell ${isError ? 'flash-red' : ''} ${isSuccess ? 'flash-green' : ''}`}
                onClick={() => handleCellClick(rowIndex, colIndex)}
              >
                {pokemon ? (
                  <div className="sprite-container">
                    <img
                      src={getPokemonSprite(pokemon.dex_number)}
                      alt={pokemon.name}
                      className="pokemon-sprite"
                    />
                    <span className="pokemon-name-label">{pokemon.name}</span>
                  </div>
                ) : (
                  <div className="empty-slot">+</div>
                )}
              </div>
            );
          })}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Grid;
