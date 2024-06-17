import React from 'react';
import { connect } from 'react-redux';
import logo from './logo.png';
import search from './search.png';
import notifications from './Bell.png';
import settings from './settings.png';
import avatar from './avataricon.png';
import './Header.css';

interface User {
  name: string;
}

interface HeaderProps {
  user: User;
}

const Header: React.FC<HeaderProps> = ({ user }) => {
  return (
    <header style={headerStyle}>
      <div style={logoContainerStyle}>
        <img src={logo} alt="Logo" style={logoStyle} />
      </div>
      <nav style={navStyle}>
        <ul style={navListStyle}>
          <li className="nav-item"><a href="/home" className="nav-link">Home</a></li>
          <li className="nav-item"><a href="/aboutus" className="nav-link">About Us</a></li>
          <li className="nav-item"><a href="/blogs" className="nav-link">Blogs</a></li>
          <li className="nav-item"><a href="/contact" className="nav-link">Contact</a></li>
          <li className="nav-item"><a href="/faqs" className="nav-link">FAQs</a></li>
          <li className="nav-item"><a href="/search" className="nav-link"><img src={search} alt="Search" style={{ width: '15px', height: '15px' }} /></a></li>
        </ul>
      </nav>
      <div style={iconsContainerStyle}>
        <a href="/notifications" className="icon-link"><img src={notifications} alt="Notifications" style={iconStyle1} /></a>
        <a href="/settings" className="icon-link"><img src={settings} alt="Settings" style={iconStyle} /></a>
        <a href="/profile" className="icon-link"><img src={avatar} alt="Avatar" style={iconStyle} /></a>
      </div>
    </header>
  );
};

const headerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px 20px',
  color: 'white',
  width: '100vw',
  boxSizing: 'border-box',
  position: 'fixed',
  top: 5,
  left: 10,
  zIndex: 1000,
  fontFamily: 'Lufga, sans-serif', // Apply Lufga font to the header
};

const logoContainerStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center'
};

const logoStyle: React.CSSProperties = {
  width: '40px',
  height: '40px',
  marginRight: '0px'
};

const navStyle: React.CSSProperties = {
  flex: 1,
  display: 'flex',
  justifyContent: 'center'
};

const navListStyle: React.CSSProperties = {
  listStyle: 'none',
  display: 'flex',
  margin: 0,
  padding: 0
};

const iconsContainerStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center'
};

const iconStyle: React.CSSProperties = {
  width: '35px',
  height: '35px',
  marginLeft: '25px'
};

const iconStyle1: React.CSSProperties = {
  width: '55px',
  height: '50px',
  marginLeft: '25px'
};

const mapStateToProps = (state: RootState) => ({
  user: state.user.user
});

export default connect(mapStateToProps)(Header);
