import React from 'react';
import './ProfilePage.css';

interface ProfileProps {
  user: { username: string } | null;
  onLogout: () => void;
}

const ProfilePage: React.FC<ProfileProps> = ({ user, onLogout }) => {
  return (
    <div className="profile-container">
      <h1>User Profile</h1>
      <p>Welcome back, <strong>{user?.username || 'Trainer'}</strong>!</p>
      <button onClick={onLogout} className="logout-btn">
        Logout & Reset Game
      </button>
    </div>
  );
};

export default ProfilePage;
