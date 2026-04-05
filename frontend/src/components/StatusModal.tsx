import React from 'react';
import './StatusModal.css';
import { useNavigate } from 'react-router-dom';

interface StatusModalProps {
  message: string | null;
  lives: number;
  onClose: () => void;
  onReveal: () => void;
}

const StatusModal: React.FC<StatusModalProps> = ({ message, lives, onClose, onReveal }) => {
  const navigate = useNavigate();
  if (!message) return null;

  const isGameOver = lives <= 0;
  const isWinGuest = message === 'COMPLETED_GUEST';
  const isWinLoggedIn = message === 'COMPLETED_LOGGED_IN';

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {isWinLoggedIn && (
          <>
            <h3>Perfect 9/9!</h3>
            <p>Great job! This board has been saved to your profile.</p>
            <div className="modal-actions">
              <button type="button" className="modal-btn modal-btn--primary" onClick={() => navigate('/profile')}>
                View Profile
              </button>
              <button type="button" className="modal-btn modal-btn--secondary" onClick={onClose}>
                Close
              </button>
            </div>
          </>
        )}

        {isWinGuest && (
          <>
            <h3>Wow, 9/9!</h3>
            <p>Want to save your achievements? Sign up to track your history!</p>
            <div className="modal-actions">
              <button type="button" className="modal-btn modal-btn--primary" onClick={() => navigate('/auth')}>
                Login / Sign Up
              </button>
              <button type="button" className="modal-btn modal-btn--secondary" onClick={onClose}>
                Dismiss
              </button>
            </div>
          </>
        )}

        {!isWinLoggedIn && !isWinGuest && (
          <>
            <h3>{isGameOver ? 'Game Over' : 'Incorrect'}</h3>
            <p>{message}</p>
            <div className="modal-actions modal-actions--single">
              <button type="button" className="modal-btn modal-btn--primary" onClick={isGameOver ? onReveal : onClose}>
                {isGameOver ? 'View Results' : 'Got it'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default StatusModal;
