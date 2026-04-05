import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api';
import type { UserSession } from '../types';
import './AuthPage.css';

interface AuthPageProps {
  onLoginSuccess: (user: UserSession) => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const endpoint = isLogin ? '/api/login' : '/api/signup';

    try {
      const res = await api.post<{ success: boolean; user?: { id: number }; userId?: number }>(
        endpoint,
        { username, password }
      );

      if (res.data.success) {
        const id = res.data.user?.id ?? res.data.userId;
        if (id != null) {
          onLoginSuccess({ id, username });
          navigate('/');
        }
      }
    } catch (err: unknown) {
      const message =
        err && typeof err === 'object' && 'response' in err
          ? (err as { response?: { data?: { message?: string } } }).response?.data?.message
          : undefined;
      setError(message || 'Something went wrong.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>{isLogin ? 'Trainer Login' : 'New Trainer Sign Up'}</h2>
        {error && <p className="auth-error">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="auth-submit">
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <p className="auth-toggle" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Need an account? Sign up here' : 'Already have an account? Log in'}
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
