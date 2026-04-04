import { useState, useEffect } from 'react';
import axios from 'axios';

export const useGameState = () => {
  const [grid, setGrid] = useState<any>(null);
  const [guesses, setGuesses] = useState<(any | null)[][]>([
    [null, null, null], [null, null, null], [null, null, null]
  ]);
  const [lives, setLives] = useState(10);

  useEffect(() => {
    if (!grid) {
      axios.get('http://localhost:5000/api/new-game')
        .then(res => setGrid(res.data))
        .catch(err => console.error("Grid fetch error:", err));
    }
  }, [grid]);

  const handleLogout = () => {
    window.location.href = '/'; 
  };

  return {
    grid, setGrid,
    guesses, setGuesses,
    lives, setLives,
    handleLogout
  };
};
