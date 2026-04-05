import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ProfilePage.css';
import CompletedGrid from '../components/CompletedGrid';

interface ProfileProps {
  user: { id: number; username: string } | null;
  onLogout: () => void;
}

const ProfilePage: React.FC<ProfileProps> = ({ user, onLogout }) => {
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    if (user) {
      axios.get(`http://localhost:5000/api/user-attempts/${user.id}`)
        .then(res => setHistory(res.data))
        .catch(err => console.error("History fetch error:", err));
    }
  }, [user]);

  return (
    <div className="profile-page">
      <div className="profile-header">
        <h1>Trainer {user?.username}</h1>
        <button onClick={onLogout} className="logout-btn">Logout</button>
      </div>
      <section className="history-section">
        <h2>Completed Puzzles</h2>
        {history.length === 0 ? (
          <p>No completed puzzles yet. Go catch 'em all!</p>
        ) : (
          <div className="attempts-list">
              {history.map((attempt) => (
              <div key={attempt.attempt_id} className="attempt-card">
                <div className="attempt-info">
                  <strong>{new Date(attempt.created_date).toLocaleDateString()}</strong>
                  <span className="score-tag">{attempt.score}/9</span>
                </div>
                
                {/* This is the new part! */}
                <CompletedGrid attemptId={attempt.attempt_id} />
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default ProfilePage;
