import React, { useEffect, useState } from 'react';
import { api } from '../api';
import CompletedGrid from '../components/CompletedGrid';
import type { UserSession } from '../types';
import './ProfilePage.css';

interface ProfileProps {
  user: UserSession | null;
  onLogout: () => void;
}

interface AttemptSummary {
  attempt_id: number;
  score: number;
  created_date: string;
}

function formatAttemptDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return iso;
  }
}

const ProfilePage: React.FC<ProfileProps> = ({ user, onLogout }) => {
  const [history, setHistory] = useState<AttemptSummary[]>([]);

  useEffect(() => {
    if (user) {
      api
        .get<AttemptSummary[]>(`/api/user-attempts/${user.id}`)
        .then((res) => setHistory(res.data))
        .catch((err) => console.error('History fetch error:', err));
    }
  }, [user]);

  return (
    <div className="profile-page">
      <div className="profile-header">
        <h1>Trainer {user?.username}</h1>
        <button type="button" onClick={onLogout} className="logout-btn">
          Logout
        </button>
      </div>
      <section className="history-section">
        <h2>Completed Puzzles</h2>
        {history.length === 0 ? (
          <p className="history-empty">No completed puzzles yet. Go to the home page to start a new game.</p>
        ) : (
          <ul className="attempts-list">
            {history.map((attempt) => (
              <li key={attempt.attempt_id}>
                <article className="attempt-card">
                  <header className="attempt-card-header">
                    <time
                      className="attempt-date"
                      dateTime={attempt.created_date}
                      title={attempt.created_date}
                    >
                      {formatAttemptDate(attempt.created_date)}
                    </time>
                    <span className="score-tag" aria-label={`Score ${attempt.score} out of 9`}>
                      {attempt.score}/9
                    </span>
                  </header>
                  <div className="attempt-card-body">
                    <CompletedGrid attemptId={attempt.attempt_id} />
                  </div>
                </article>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default ProfilePage;
