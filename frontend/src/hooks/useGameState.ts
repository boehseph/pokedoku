import { useState, useEffect } from 'react';
import { api } from '../api';
import type { NewGameResponse, PokemonPick } from '../types';

export const useGameState = () => {
  const [grid, setGrid] = useState<NewGameResponse | null>(null);
  const [guesses, setGuesses] = useState<(PokemonPick | null)[][]>([
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ]);
  const [lives, setLives] = useState(10);

  useEffect(() => {
    if (!grid) {
      api
        .get<NewGameResponse>('/api/new-game')
        .then((res) => setGrid(res.data))
        .catch((err) => console.error('Grid fetch error:', err));
    }
  }, [grid]);

  const handleLogout = () => {
    window.location.href = '/';
  };

  return {
    grid,
    setGrid,
    guesses,
    setGuesses,
    lives,
    setLives,
    handleLogout,
  };
};
