import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Grid from '../components/Grid';
import SearchOverlay from '../components/SearchOverlay';
import StatusModal from '../components/StatusModal';
import "./GamePage.css";

interface Pokemon {
  pokemon_id: number;
  dex_number: number;
  name: string;
}

interface GamePageProps {
  grid: any;
  setGrid: (g: any) => void;
  guesses: any[][];
  setGuesses: (g: any[][]) => void;
  lives: number;
  setLives: React.Dispatch<React.SetStateAction<number>>;
}

const GamePage: React.FC<GamePageProps> = ({ 
  grid, setGrid, guesses, setGuesses, lives, setLives 
}) => {
  // Keep local "UI-only" state here (things that reset every time we visit the page)
  const [activeCell, setActiveCell] = useState<{ row: number, col: number } | null>(null);
  const [successCell, setSuccessCell] = useState<{row: number, col: number} | null>(null);
  const [errorCell, setErrorCell] = useState<{row: number, col: number} | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [modalMessage, setModalMessage] = useState<string | null>(null);

  const getPokemonSprite = (dexNumber: number) => 
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/emerald/${dexNumber}.png`;

  // REMOVED: The useEffect that calls /api/new-game is now in App.tsx

  const handleCellClick = (row: number, col: number) => {
    if (lives <= 0) {
      setModalMessage("Game Over! You ran out of guesses.");
      return;
    }
    if (guesses[row][col]) return;
    setActiveCell({ row, col });
    setSearchTerm('');
    setSearchResults([]);
  };

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value.length > 1) {
      const res = await axios.get(`http://localhost:5000/api/pokemon/search?q=${value}`);
      setSearchResults(res.data);
    } else {
      setSearchResults([]);
    }
  };

  const handleSelectPokemon = async (pokemon: any) => {
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
        setGuesses(newGuesses); // Updates App.tsx state
        setSuccessCell({ row: activeCell.row, col: activeCell.col });
        setTimeout(() => setSuccessCell(null), 500);
      } else {
        setErrorCell({ row: activeCell.row, col: activeCell.col });
        setTimeout(() => setErrorCell(null), 500);
        setModalMessage(`${pokemon.name} is incorrect!`);
      }
      setActiveCell(null);
    } catch (err) { console.error(err); }
  };

  const revealRemaining = async () => {
    const res = await axios.post('http://localhost:5000/api/get-solutions', {
      rows: grid.rows, cols: grid.cols
    });
    const finalGrid = guesses.map((row, i) => 
      row.map((cell, j) => cell || res.data[i][j])
    );
    setGuesses(finalGrid);
    setModalMessage(null); 
  };

  if (!grid) return <div className="loading">Loading PokéDoku...</div>;
  
  return (
    <div className="game-container">
      <h1>PokéDoku</h1>
      <Grid 
        grid={grid} 
        guesses={guesses} 
        handleCellClick={handleCellClick}
        errorCell={errorCell}
        successCell={successCell}
        getPokemonSprite={getPokemonSprite}
      />
      <div className="stats-container">
        <div className="lives-counter">Guesses: {lives}/10</div>
      </div>
      <SearchOverlay 
        activeCell={activeCell} grid={grid} 
        searchTerm={searchTerm} searchResults={searchResults}
        onSearch={handleSearch} onSelect={handleSelectPokemon}
        onClose={() => setActiveCell(null)}
      />
      <StatusModal 
        message={modalMessage} lives={lives}
        onClose={() => setModalMessage(null)}
        onReveal={revealRemaining}
      />
    </div>
  );
};

export default GamePage;
