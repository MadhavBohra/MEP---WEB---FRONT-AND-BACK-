'use client';

import React from 'react';
import Link from 'next/link';
import './Header.css'; 

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <img src="/logo.png" alt="Logo" />
      </div>
      <nav className="nav-links">
        <a href='/LandingPage'>Home</a>
        <span>/</span>
        <a href="/AboutUs">About Us</a>
        <span>/</span>
        <a href="/Blogs">Blogs</a>
        <span>/</span>
        <a href="/FAQs">FAQs</a>
        <span>/</span>
        <a href="/ContactUs">Contact</a>
        <span>/</span>
        <img className="icon" src="/search.png" alt="Search" />
      </nav>
      <div className="icons">
        <a href='/SignUp' className="bell"><button className='signup'>SignUp</button></a>
        <a href='/LoginPage' className="avatar"><button className='login'>Login</button></a>
      </div>
    </header>
  );
};

export default Header;
