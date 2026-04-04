import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

interface Constraint {
  type: string;
  name: string;
  id: number;
}

interface Pokemon {
  pokemon_id: number;
  dex_number: number;
  name: string;
}

function App() {
  const [grid, setGrid] = useState<{ rows: Constraint[], cols: Constraint[] } | null>(null);
  const [guesses, setGuesses] = useState<(Pokemon | null)[][]>([
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ]);

  // --- NEW STATE FOR SEARCH ---
  const [activeCell, setActiveCell] = useState<{ row: number, col: number } | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Pokemon[]>([]);

  const getPokemonSprite = (dexNumber: number) => {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/emerald/${dexNumber}.png`;
  };

  useEffect(() => {
    axios.get('http://localhost:5000/api/new-game')
      .then(res => setGrid(res.data))
      .catch(err => console.error(err));
  }, []);

  // --- 1. HANDLE CELL CLICK ---
  const handleCellClick = (row: number, col: number) => {
    if (guesses[row][col]) return; // Don't open if already guessed correctly
    setActiveCell({ row, col });
    setSearchTerm('');
    setSearchResults([]);
  };

  // --- 2. HANDLE SEARCH INPUT ---
  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.length > 1) {
      try {
        const res = await axios.get(`http://localhost:5000/api/pokemon/search?q=${value}`);
        setSearchResults(res.data);
      } catch (err) {
        console.error("Search error:", err);
      }
    } else {
      setSearchResults([]);
    }
  };

  // --- 3. HANDLE SELECTING A POKEMON ---
  const handleSelectPokemon = async (pokemon: Pokemon) => {
    if (!activeCell || !grid) return;

    const rowConstraint = grid.rows[activeCell.row];
    const colConstraint = grid.cols[activeCell.col];

    try {
      const res = await axios.post('http://localhost:5000/api/check-guess', {
        pokemon_id: pokemon.pokemon_id,
        rowConstraint,
        colConstraint
      });

      if (res.data.correct) {
        const newGuesses = [...guesses];
        newGuesses[activeCell.row][activeCell.col] = pokemon;
        setGuesses(newGuesses);
        setActiveCell(null);
      } else {
        alert("Wrong! Try again.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (!grid) return <div>Loading PokéDoku...</div>;

  return (
    <div className="game-container">
      <h1>PokéDoku</h1>

      <div className="grid-wrapper">
        <div className="corner-cell"></div>
        {grid.cols.map(col => (
          <div key={col.id} className="header-cell col-header">{col.name}</div>
        ))}

        {grid.rows.map((row, rowIndex) => (
          <React.Fragment key={row.id}>
            <div className="header-cell row-header">{row.name}</div>
            {[0, 1, 2].map((colIndex) => {
              const guessedPokemon = guesses[rowIndex][colIndex];
              return (
                <div 
                  key={colIndex} 
                  className="play-cell"
                  onClick={() => handleCellClick(rowIndex, colIndex)}
                >
                  {guessedPokemon ? (
                    <div className="sprite-container">
                      <img 
                        src={getPokemonSprite(guessedPokemon.dex_number)} 
                        alt={guessedPokemon.name}
                        className="pokemon-sprite"
                      />
                      <span className="pokemon-name-label">{guessedPokemon.name}</span>
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

      {/* --- SEARCH OVERLAY --- */}
      {activeCell && (
        <div className="search-overlay">
          <div className="search-modal">
            <button className="close-btn" onClick={() => setActiveCell(null)}>X</button>
            <h3>Guess a Pokémon</h3>
            <input 
              type="text" 
              placeholder="Type name..." 
              value={searchTerm} 
              onChange={handleSearch}
              autoFocus
            />
            <div className="results-list">
              {searchResults.map(p => (
                <div key={p.pokemon_id} className="result-item" onClick={() => handleSelectPokemon(p)}>
                  {p.name} (#{p.dex_number})
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;