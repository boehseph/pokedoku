import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import GamePage from './pages/GamePage';
import AuthPage from './pages/AuthPage';
import ProfilePage from './pages/ProfilePage';
import Toast from './components/Toast';
import { useGameState } from './hooks/useGameState';
import './App.css';

function App() {
  const [user, setUser] = useState<{ id: number; username: string } | null>(null);
  const [welcomeMessage, setWelcomeMessage] = useState<string | null>(null);
  const gameState = useGameState();

  const handleLogin = (userData: { id: number; username: string }) => {
    setUser(userData);
    setWelcomeMessage(`Welcome, Trainer ${userData.username}!`);
  };

  return (
    <BrowserRouter>
      <div className="app-layout">
        {welcomeMessage && (
          <Toast 
            message={welcomeMessage} 
            onClose={() => setWelcomeMessage(null)} 
          />
        )}

        <Sidebar isLoggedIn={!!user} />
        <main className="content-area">
          <Routes>
            <Route path="/" element={<GamePage {...gameState} />} />
            <Route path="/auth" element={<AuthPage onLoginSuccess={handleLogin} />} />
            <Route path="/profile" element={
              <ProfilePage user={user} onLogout={gameState.handleLogout} />
            } />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
