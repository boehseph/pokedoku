import React from 'react';
import type { NewGameResponse, PokemonPick } from '../types';
import './SearchOverlay.css';

interface SearchOverlayProps {
  activeCell: { row: number; col: number } | null;
  grid: NewGameResponse;
  searchTerm: string;
  searchResults: { pokemon_id: number; dex_number: number; name: string }[];
  onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelect: (p: PokemonPick) => void;
  onClose: () => void;
}

const SearchOverlay: React.FC<SearchOverlayProps> = ({
  activeCell,
  grid,
  searchTerm,
  searchResults,
  onSearch,
  onSelect,
  onClose,
}) => {
  if (!activeCell) return null;

  return (
    <div className="search-overlay">
      <div className="search-modal">
        <button type="button" className="close-btn" onClick={onClose}>
          X
        </button>
        <h3>Guess a Pokémon</h3>
        <p className="hint">
          Target: {grid.rows[activeCell.row].name} + {grid.cols[activeCell.col].name}
        </p>
        <input type="text" placeholder="Type name..." value={searchTerm} onChange={onSearch} autoFocus />
        <div className="results-list">
          {searchResults.map((p) => (
            <div key={p.pokemon_id} className="result-item" onClick={() => onSelect(p)}>
              {p.name} (#{p.dex_number})
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchOverlay;
