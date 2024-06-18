import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Header.css'; // Ensure this path is correct

const Header = () => {
  const navigate = useNavigate();

  const handleAvatarClick = () => {
    navigate('/user-details');
  };

  return (
    <header className="header">
      <div className="logo">
        <img src="/logo.png" alt="Logo" />
      </div>
      <nav className="nav-links">
        <a href="#home">Home</a>
        <span>/</span>
        <a href="#about-us">About Us</a>
        <span>/</span>
        <a href="#blogs">Blogs</a>
        <span>/</span>
        <a href="#contact">Contact</a>
        <span>/</span>
        <a href="#faqs">FAQs</a>
        <span>/</span>
        <img className="icon" src="/search.png" alt="Search" />
      </nav>
      <div className="icons">
        <img className="bell" src="/bell.png" alt="Notifications" />
        <img className="settings" src="/settings.png" alt="Settings" />
        <img className="avatar" src="/avataricon.png" alt="User Avatar" onClick={handleAvatarClick} />
      </div>
    </header>
  );
};

export default Header;
