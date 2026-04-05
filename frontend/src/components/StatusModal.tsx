import React from 'react';
import "./StatusModal.css";
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
  const isWinGuest = message === "COMPLETED_GUEST";
  const isWinLoggedIn = message === "COMPLETED_LOGGED_IN";

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {/* WIN STATE: LOGGED IN */}
        {isWinLoggedIn && (
          <>
            <h3>Perfect 9/9!</h3>
            <p>Great job! This board has been saved to your profile.</p>
            <button onClick={() => navigate('/profile')}>View Profile</button>
            <button onClick={onClose} style={{background: '#999', marginLeft: '10px'}}>Close</button>
          </>
        )}

        {/* WIN STATE: GUEST */}
        {isWinGuest && (
          <>
            <h3>Wow, 9/9!</h3>
            <p>Want to save your achievements? Sign up to track your history!</p>
            <button onClick={() => navigate('/auth')}>Login / Sign Up</button>
            <button onClick={onClose} style={{background: '#999', marginLeft: '10px'}}>Dismiss</button>
          </>
        )}

        {/* DEFAULT STATES (Incorrect/Game Over) */}
        {!isWinLoggedIn && !isWinGuest && (
          <>
            <h3>{isGameOver ? "Game Over" : "Incorrect"}</h3>
            <p>{message}</p>
            <button onClick={isGameOver ? onReveal : onClose}>
              {isGameOver ? "View Results" : "Got it"}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default StatusModal;
