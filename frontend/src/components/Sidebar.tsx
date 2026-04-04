import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, User, UserCheck } from 'lucide-react';
import "./Sidebar.css";

interface SidebarProps {
  isLoggedIn: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isLoggedIn }) => {
  const location = useLocation();

  return (
    <div className="sidebar">
      <Link to="/" className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}>
        <Home size={32} />
        <span>Home</span>
      </Link>

      <Link 
        to={isLoggedIn ? "/profile" : "/auth"} 
        className={`nav-item ${location.pathname.includes('auth') || location.pathname === '/profile' ? 'active' : ''}`}
      >
        {isLoggedIn ? <UserCheck size={32} fill="currentColor" /> : <User size={32} />}
        <span>{isLoggedIn ? "Profile" : "Login"}</span>
      </Link>
    </div>
  );
};

export default Sidebar;
