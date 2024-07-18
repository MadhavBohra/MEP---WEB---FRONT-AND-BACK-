'use client';

import './Blogs.css';
import React, { useState, useEffect } from 'react';
import LandingHeader from '../components/LandingHeader/Header';
import UserDashboardHeader from '../components/UserDashboardHeader/Header';

interface Blog {
  id: number;
  title: string;
  content: string;
  images: string[];
  pdfUrl: string;
}

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
    <div>
      {!authState.authenticated ? <LandingHeader /> : <UserDashboardHeader />}
    </div>
  );
};

const Blogs: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [expandedBlogId, setExpandedBlogId] = useState<number | null>(null);

  useEffect(() => {
    fetch('/blogs.json')
      .then(response => response.json())
      .then(data => setBlogs(data))
      .catch(error => console.error('Error fetching blogs data:', error));
  }, []);

  const toggleExpand = (id: number) => {
    setExpandedBlogId(prev => (prev === id ? null : id));
  };

  return (
    
    <>
      <HeaderComponent />
      <div className="blogs-container">
        {blogs.map((blog, index) => (
          <div
            key={blog.id}
            className={`blog-box ${expandedBlogId === blog.id ? 'expanded' : ''} ${index % 2 === 0 ? 'even' : 'odd'}`}
            onClick={() => toggleExpand(blog.id)}
          >
            {index % 2 === 0 ? (
              <>
                {blog.images.length > 0 && (
                  <img src={blog.images[0]} alt={blog.title} className="blog-image" />
                )}
                <div className="content">
                  <h2>{blog.title}</h2>
                  <div className="text-content">
                    <p>{expandedBlogId === blog.id ? blog.content : `${blog.content.substring(0, 100)}...`}</p>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="content">
                  <h2>{blog.title}</h2>
                  <div className="text-content">
                    <p>{expandedBlogId === blog.id ? blog.content : `${blog.content.substring(0, 100)}...`}</p>
                  </div>
                </div>
                {blog.images.length > 0 && (
                  <img src={blog.images[0]} alt={blog.title} className="blog-image" />
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default Blogs;
