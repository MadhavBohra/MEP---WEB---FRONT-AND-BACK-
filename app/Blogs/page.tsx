'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '../components/Header/Header';
import UserDashboardHeader from "../components/UserDashboardHeader/Header";
import LandingHeader from "../components/LandingHeader/Header";
import PDFModal from '../components/PdfModal/PdfModal';
import './Blogs.css';

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
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null);

  useEffect(() => {
    fetch('/blogs.json')
      .then(response => response.json())
      .then(data => setBlogs(data))
      .catch(error => console.error('Error fetching blogs data:', error));
  }, []);

  const handlePdfClick = (pdfUrl: string) => {
    // Construct the full URL for the PDF
    const fullPdfUrl = `${window.location.origin}${pdfUrl}`;
    setSelectedPdf(fullPdfUrl);
  };

  return (
    <>
      <HeaderComponent />
      <div className="blogs-container">
        {blogs.map((blog, index) => (
          <div key={index} className={`blog-box ${index % 2 === 0 ? 'even' : 'odd'}`} onClick={() => handlePdfClick(blog.pdfUrl)}>
            {index % 2 === 0 ? (
              <>
                {blog.images.length > 0 && (
                  <img src={blog.images[0]} alt={blog.title} className="blog-image" />
                )}
                <div className="content">
                  <h2>{blog.title}</h2>
                  <div className="text-content">
                    <p>{blog.content.substring(0, 100)}...</p>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="content">
                  <h2>{blog.title}</h2>
                  <div className="text-content">
                    <p>{blog.content.substring(0, 100)}...</p>
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
      {selectedPdf && <PDFModal pdfUrl={selectedPdf} onClose={() => setSelectedPdf(null)} />}
    </>
  );
};

export default Blogs;
