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
  const [successCell, setSuccessCell] = useState<{row: number, col: number} | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Pokemon[]>([]);

  const [lives, setLives] = useState(10);
  const [errorCell, setErrorCell] = useState<{row: number, col: number} | null>(null);
  const [modalMessage, setModalMessage] = useState<string | null>(null);

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
    if (lives <= 0) {
      setModalMessage("Game Over! You ran out of guesses.");
      return;
    }
    
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
    if (!activeCell || !grid || lives <= 0) return;

    setLives(prev => prev - 1);

    try {
      const res = await axios.post('http://localhost:5000/api/check-guess', {
        pokemon_id: pokemon.pokemon_id,
        rowConstraint: grid.rows[activeCell.row],
        colConstraint: grid.cols[activeCell.col]
      });

      if (res.data.correct) {
        const newGuesses = [...guesses];
        newGuesses[activeCell.row][activeCell.col] = pokemon;
        setGuesses(newGuesses);
        
        // Green Flash
        setSuccessCell({ row: activeCell.row, col: activeCell.col });
        setTimeout(() => setSuccessCell(null), 500);
      } else {
        // Red Flash
        setErrorCell({ row: activeCell.row, col: activeCell.col });
        setTimeout(() => setErrorCell(null), 500);
        setModalMessage(`${pokemon.name} is incorrect!`);
      }
      setActiveCell(null);
    } catch (err) { console.error(err); }
  };

const revealRemaining = async () => {
    if (!grid) return;
    try {
      const res = await axios.post('http://localhost:5000/api/get-solutions', {
        rows: grid.rows,
        cols: grid.cols
      });
      
      // Create a copy of the current guesses
      const finalGrid = guesses.map((row, i) => 
        row.map((cell, j) => cell || res.data[i][j])
      );
      
      setGuesses(finalGrid);
      setModalMessage(null); 
    } catch (err) { 
      console.error("Frontend Reveal Error:", err);
      alert("Could not fetch solutions. Check backend terminal!");
    }
  };

  if (!grid) return <div>Loading PokéDoku...</div>;

  return (
    <div className="game-container">
      <h1>PokéDoku</h1>

      {/* 1. THE GAME GRID */}
    <div className="grid-wrapper">
      {/* Row 1: Corner + Column Headers */}
      <div className="corner-cell"></div>
      {grid.cols.map((col, index) => (
        <div key={`col-${col.id}-${index}`} className="header-cell">
          {col.name}
        </div>
      ))}

      {/* Rows 2, 3, and 4 */}
      {grid.rows.map((row, rowIndex) => (
        <React.Fragment key={`row-group-${row.id}`}>
          {/* Slot 1 of the row: The Header */}
          <div className="header-cell">{row.name}</div>

          {/* Slots 2, 3, 4 of the row: The Play Cells */}
          {[0, 1, 2].map((colIndex) => {
            const guessedPokemon = guesses[rowIndex][colIndex];
            const isError = errorCell?.row === rowIndex && errorCell?.col === colIndex;
            const isSuccess = successCell?.row === rowIndex && successCell?.col === colIndex;

            return (
              <div 
                key={`cell-${rowIndex}-${colIndex}`}
                className={`play-cell ${isError ? 'flash-red' : ''} ${isSuccess ? 'flash-green' : ''}`}
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
      {/* 2. STATS & COUNTER */}
      <div className="stats-container">
        <div className="lives-counter">Guesses: {lives}/10</div>
      </div>

      {/* 3. ERROR / GAME OVER MODAL */}
      {modalMessage && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>{lives <= 0 ? "Game Over" : "Incorrect"}</h3>
            <p>{modalMessage}</p>
            <button onClick={lives <= 0 ? revealRemaining : () => setModalMessage(null)}>
              {lives <= 0 ? "View Results" : "Got it"}
            </button>
          </div>
        </div>
      )}

      {/* 4. SEARCH OVERLAY */}
      {activeCell && (
        <div className="search-overlay">
          <div className="search-modal">
            <button className="close-btn" onClick={() => setActiveCell(null)}>
              X
            </button>
            <h3>Guess a Pokémon</h3>
            <p className="hint">
              Target: {grid.rows[activeCell.row].name} + {grid.cols[activeCell.col].name}
            </p>
            <input
              type="text"
              placeholder="Type name..."
              value={searchTerm}
              onChange={handleSearch}
              autoFocus
            />
            <div className="results-list">
              {searchResults.map((p) => (
                <div
                  key={p.pokemon_id}
                  className="result-item"
                  onClick={() => handleSelectPokemon(p)}
                >
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
