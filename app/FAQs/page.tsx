"use client";

import React, { useState, useEffect } from 'react';
import Header from '../components/Header/Header'; // Adjust the path as needed
import './FAQs.css'; // Ensure this file contains the styles for the FAQ page
import LandingHeader from "../components/LandingHeader/Header";
import UserDashboardHeader from "../components/UserDashboardHeader/Header";

interface FAQItemProps {
  question: string;
  answer: string;
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
      {! authState.authenticated ? <LandingHeader /> : <UserDashboardHeader />}    </div>
  );
};

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="faq-item">
      <button className="faq-question" onClick={() => setIsOpen(!isOpen)}>
        {question}
        <span className="icon">
          <img src={isOpen ? '/cross.png' : '/plus.png'} alt={isOpen ? "Close" : "Open"} />
        </span>
      </button>
      {isOpen && (
        <div className="faq-answer">
          <p>{answer}</p>
        </div>
      )}
      <hr /> 
    </div>
  );
};

const FAQs: React.FC = () => {
  const faqData = [
    {
      question: "1. What is MyEasyPharma? ",
      answer: "MyEasyPharma is a digital platform that offers personalized health solutions to prevent lifestyle disorders and NCDs through a combination of AI technology and personal health coaching."
    },
    {
      question: "2. How does MyEasyPharma help prevent lifestyle diseases?",
      answer: "By analyzing your daily health inputs like stress levels, sleep quality, and calorie intake, MyEasyPharma provides tailored advice and solutions designed to improve your overall health and prevent diseases."
    },
    {
      question: "3. Who can benefit from using MyEasyPharma?",
      answer:"Working professionals looking to manage their health proactively will find our services particularly beneficial, especially those interested in personalized health monitoring and advice."
    },
    {
      question: "4. How do I sign up for MyEasyPharma?",
      answer: "Visit our website or download our mobile app, and sign up by creating an account. You'll be guided through a simple setup process to start tracking your health data."
    }
    // Add more FAQ items as needed
  ];

  return (
    <div>
      <HeaderComponent /> {/* Include the Header component */}
      <div className="faqs-container">
        <div className="intro-text">
          <h1>FAQs on Health and Wellness</h1>
          <h3>Explore our frequently asked questions to find answers on topics ranging from yoga poses and dietary charts to the benefits of specific foods and exercises. Gain insights into managing lifestyle diseases, improving fitness, and maintaining overall well-being.</h3>
        </div>
        {faqData.map((faq, index) => (
          <FAQItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </div>
  );
};

export default FAQs;
