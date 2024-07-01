'use client';

import React from 'react';
import Link from 'next/link';
import { useState } from 'react';
import { useEffect } from 'react';
import Header from '../components/Header/Header';
import UserDashboardHeader from "../components/UserDashboardHeader/Header";
import LandingHeader from "../components/LandingHeader/Header";
import './Blogs.css';

interface Blog {
  id: number;
  title: string;
  excerpt: string;
  link: string;
  image: string; // Add image property
}

const blogs: Blog[] = [
  { id: 1, title: 'Why the Current Generation is More Prone to Lifestyle Disorders', excerpt: "In today's fast-paced world, lifestyle disorders have become increasingly common, particularly among the younger generation. Factors such as sedentary behavior, poor dietary choices, and high-stress levels contribute significantly to this troubling trend.", link: '/blog1', image: '/blogsimg.png' },
  { id: 2, title: 'Why the Current Generation is More Prone to Lifestyle Disorders', excerpt: "In today's fast-paced world, lifestyle disorders have become increasingly common, particularly among the younger generation. Factors such as sedentary behavior, poor dietary choices, and high-stress levels contribute significantly to this troubling trend.", link: '/blog2', image: '/blogsimg.png' },
  { id: 3, title: 'Why the Current Generation is More Prone to Lifestyle Disorders', excerpt: "In today's fast-paced world, lifestyle disorders have become increasingly common, particularly among the younger generation. Factors such as sedentary behavior, poor dietary choices, and high-stress levels contribute significantly to this troubling trend.", link: '/blog3', image: '/blogsimg.png' },
  { id: 4, title: 'Why the Current Generation is More Prone to Lifestyle Disorders', excerpt: "In today's fast-paced world, lifestyle disorders have become increasingly common, particularly among the younger generation. Factors such as sedentary behavior, poor dietary choices, and high-stress levels contribute significantly to this troubling trend.", link: '/blog4', image: '/blogsimg.png' },
];
const loadAuthState = () => {
  try {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      return { authenticated: true, token: storedToken };
    } else {
      return { authenticated: false, token: '' };
    }
  } catch (error) {
    console.error('Error accessing localStorage:', error);
    return { authenticated: false, token: '' };
  }
};

const HeaderComponent = () => {
  const [authState, setAuthState] = useState({ authenticated: false, token: '' });

  useEffect(() => {
    const state = loadAuthState();
    setAuthState(state);

    const handleBeforeUnload = () => {
      localStorage.removeItem('token');
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setAuthState({ authenticated: false, token: '' });
  };

  return (
    <div >
      {authState.authenticated ? <UserDashboardHeader /> : <LandingHeader />}
    </div>
  );
};

const Blogs: React.FC = () => {
  return (
    <>
      <HeaderComponent />
      <div className="blogs-container">
        {blogs.map((blog, index) => (
          <Link key={blog.id} href={blog.link} className={`blog-box ${index % 2 === 0 ? 'even' : 'odd'}`}>
            <div className="content">
              <img src={blog.image} alt={blog.title} className="blog-image" />
              <div className="text-content">
                <h2>{blog.title}</h2>
                <p>{blog.excerpt}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Blogs;
