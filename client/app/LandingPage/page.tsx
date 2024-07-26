'use client';

import React, { useState, useEffect } from "react";
import { StoreProvider } from "../StoreProvider";
import Link from "next/link";
import styles from "./LandingPage.module.css";
import LandingHeader from "../components/LandingHeader/Header";
import UserDashboardHeader from "../components/UserDashboardHeader/Header";

// Function to load authentication state
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
    <div className={styles.headercomp}>
      {! authState.authenticated ? <LandingHeader /> : <UserDashboardHeader />}
    </div>
  );
};

export default function LandingPage() {
  return (
    <StoreProvider>
      <div className={styles.background}>
        <HeaderComponent />
        <div className={styles.container}>
          <p className={styles.t1}>AI Curated corporate wellness program</p>
          <p className={styles.t2}>MyEasyPharma</p>
          <Link href='/SignUp'><button className={styles.b1}>Get started for free</button></Link>
          <Link href='/OurServices'><button className={styles.b2}>&#x25BC; Our Services</button></Link>
        </div>
      </div>
    </StoreProvider>
  );
}
