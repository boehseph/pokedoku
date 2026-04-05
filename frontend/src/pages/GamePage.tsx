import React, { useCallback, useEffect, useState } from 'react';
import { api } from '../api';
import Grid from '../components/Grid';
import SearchOverlay from '../components/SearchOverlay';
import StatusModal from '../components/StatusModal';
import { getPokemonSpriteUrl } from '../utils/pokemon';
import type { NewGameResponse, PendingBoard, PokemonPick, UserSession } from '../types';
import './GamePage.css';

interface GamePageProps {
  grid: NewGameResponse | null;
  setGrid: (g: NewGameResponse | null) => void;
  guesses: (PokemonPick | null)[][];
  setGuesses: (g: (PokemonPick | null)[][]) => void;
  lives: number;
  setLives: React.Dispatch<React.SetStateAction<number>>;
  user: UserSession | null;
  pendingBoard: PendingBoard | null;
  setPendingBoard: (b: PendingBoard | null) => void;
}

interface SearchHit {
  pokemon_id: number;
  dex_number: number;
  name: string;
}

const GamePage: React.FC<GamePageProps> = ({
  grid,
  setGrid: _setGrid,
  guesses,
  setGuesses,
  lives,
  setLives,
  user,
  pendingBoard,
  setPendingBoard,
}) => {
  const [activeCell, setActiveCell] = useState<{ row: number; col: number } | null>(null);
  const [successCell, setSuccessCell] = useState<{ row: number; col: number } | null>(null);
  const [errorCell, setErrorCell] = useState<{ row: number; col: number } | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<SearchHit[]>([]);
  const [modalMessage, setModalMessage] = useState<string | null>(null);

  const saveToDatabase = useCallback(
    async (userId: number, puzzleId: number, finalGuesses: (PokemonPick | null)[][]) => {
      setPendingBoard(null);
      try {
        await api.post('/api/save-attempt', {
          user_id: userId,
          puzzle_id: puzzleId,
          guesses: finalGuesses,
          score: 9,
          did_complete: true,
        });
        setModalMessage('COMPLETED_LOGGED_IN');
      } catch (e) {
        console.error('Save failed:', e);
      }
    },
    [setPendingBoard]
  );

  const handleGameComplete = (finalGuesses: (PokemonPick | null)[][]) => {
    if (!grid) return;
    if (user) {
      saveToDatabase(user.id, grid.puzzle_id, finalGuesses);
    } else {
      setPendingBoard({ puzzle_id: grid.puzzle_id, guesses: finalGuesses });
      setModalMessage('COMPLETED_GUEST');
    }
  };

  useEffect(() => {
    if (user && pendingBoard) {
      saveToDatabase(user.id, pendingBoard.puzzle_id, pendingBoard.guesses);
    }
  }, [user, pendingBoard, saveToDatabase]);

  const handleCellClick = (row: number, col: number) => {
    if (lives <= 0) {
      setModalMessage('Game Over! You ran out of guesses.');
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
      const res = await api.get<SearchHit[]>('/api/pokemon/search', { params: { q: value } });
      setSearchResults(res.data);
    } else {
      setSearchResults([]);
    }
  };

  const handleSelectPokemon = async (pokemon: PokemonPick) => {
    if (!activeCell || !grid || lives <= 0) return;

    setLives((prev) => prev - 1);

    try {
      const res = await api.post<{ correct: boolean; message?: string }>('/api/check-guess', {
        pokemon_id: pokemon.pokemon_id,
        rowConstraint: grid.rows[activeCell.row],
        colConstraint: grid.cols[activeCell.col],
      });

      if (res.data.correct) {
        const newGuesses = guesses.map((row) => [...row]);
        newGuesses[activeCell.row][activeCell.col] = pokemon;
        setGuesses(newGuesses);

        const totalFilled = newGuesses.flat().filter((cell) => cell !== null).length;
        if (totalFilled === 9) {
          handleGameComplete(newGuesses);
        }

        setSuccessCell({ row: activeCell.row, col: activeCell.col });
        setTimeout(() => setSuccessCell(null), 500);
      } else {
        setErrorCell({ row: activeCell.row, col: activeCell.col });
        setTimeout(() => setErrorCell(null), 500);
        setModalMessage(`${pokemon.name} is incorrect!`);
      }
      setActiveCell(null);
    } catch (err) {
      console.error(err);
    }
  };

  const revealRemaining = async () => {
    if (!grid) return;
    const res = await api.post<(PokemonPick | null)[][]>('/api/get-solutions', {
      rows: grid.rows,
      cols: grid.cols,
    });
    const finalGrid = guesses.map((row, i) => row.map((cell, j) => cell || res.data[i][j]));
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
        getPokemonSprite={getPokemonSpriteUrl}
      />
      <div className="stats-container">
        <div className="lives-counter">Guesses: {lives}/10</div>
      </div>
      <SearchOverlay
        activeCell={activeCell}
        grid={grid}
        searchTerm={searchTerm}
        searchResults={searchResults}
        onSearch={handleSearch}
        onSelect={handleSelectPokemon}
        onClose={() => setActiveCell(null)}
      />
      <StatusModal
        message={modalMessage}
        lives={lives}
        onClose={() => setModalMessage(null)}
        onReveal={revealRemaining}
      />
    </div>
  );
};

export default GamePage;
