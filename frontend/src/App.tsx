import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import GamePage from './pages/GamePage';
import AuthPage from './pages/AuthPage';
import ProfilePage from './pages/ProfilePage';
import Toast from './components/Toast';
import { useGameState } from './hooks/useGameState';
import type { PendingBoard, UserSession } from './types';
import './App.css';

function App() {
  const [user, setUser] = useState<UserSession | null>(null);
  const [welcomeMessage, setWelcomeMessage] = useState<string | null>(null);
  const [pendingBoard, setPendingBoard] = useState<PendingBoard | null>(null);
  const gameState = useGameState();

  const handleLogin = (userData: UserSession) => {
    setUser(userData);
    setWelcomeMessage(`Welcome, Trainer ${userData.username}!`);
  };

  return (
    <BrowserRouter>
      <div className="app-layout">
        {welcomeMessage && (
          <Toast message={welcomeMessage} onClose={() => setWelcomeMessage(null)} />
        )}

        <Sidebar isLoggedIn={!!user} />
        <main className="content-area">
          <Routes>
            <Route
              path="/"
              element={
                <GamePage
                  {...gameState}
                  user={user}
                  pendingBoard={pendingBoard}
                  setPendingBoard={setPendingBoard}
                />
              }
            />
            <Route path="/auth" element={<AuthPage onLoginSuccess={handleLogin} />} />
            <Route
              path="/profile"
              element={<ProfilePage user={user} onLogout={gameState.handleLogout} />}
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
