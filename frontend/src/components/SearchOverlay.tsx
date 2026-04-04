import React from 'react';
import "./SearchOverlay.css";

interface SearchProps {
  activeCell: any;
  grid: any;
  searchTerm: string;
  searchResults: any[];
  onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelect: (p: any) => void;
  onClose: () => void;
}

const SearchOverlay: React.FC<SearchProps> = ({ activeCell, grid, searchTerm, searchResults, onSearch, onSelect, onClose }) => {
  if (!activeCell) return null;

  return (
    <div className="search-overlay">
      <div className="search-modal">
        <button className="close-btn" onClick={onClose}>X</button>
        <h3>Guess a Pokémon</h3>
        <p className="hint">Target: {grid.rows[activeCell.row].name} + {grid.cols[activeCell.col].name}</p>
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
