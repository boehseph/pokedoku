import React from 'react';
import "./StatusModal.css";

interface StatusModalProps {
  message: string | null;
  lives: number;
  onClose: () => void;
  onReveal: () => void;
}

const StatusModal: React.FC<StatusModalProps> = ({ message, lives, onClose, onReveal }) => {
  if (!message) return null;

  const isGameOver = lives <= 0;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>{isGameOver ? "Game Over" : "Incorrect"}</h3>
        <p>{message}</p>
        <button onClick={isGameOver ? onReveal : onClose}>
          {isGameOver ? "View Results" : "Got it"}
        </button>
      </div>
    </div>
  );
};

export default StatusModal;
