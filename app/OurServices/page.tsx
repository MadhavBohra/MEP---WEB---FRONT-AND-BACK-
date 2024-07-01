'use client';
import React, { useState, useEffect } from "react";
import HealthWellness from "../components/HealthWellness/HealthWellness";
import styles from "./OurServices.module.css";
import LandingHeader from "../components/LandingHeader/Header";
import UserDashboardHeader from "../components/UserDashboardHeader/Header";

const OurServices: React.FC = () => {

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
        {authState.authenticated ? <UserDashboardHeader /> : <LandingHeader />}
      </div>
    );
  };

  return (
    <div className={styles.root}>
      <HeaderComponent />
      <div className={styles.ourServices}>
        <div className={styles.ourServicesChild} />
        <div className={styles.ourServicesItem} />
        <div className={styles.ourServicesInner} />
        <div className={styles.lineDiv} />
        <div className={styles.servicesContainer}>
          <div className={styles.loginContainer}>
            <div className={styles.loginField}>
              
            </div>
            <h1 className={styles.ourServices1}>Our Services</h1>
          </div>
        </div>
        <div className={styles.backgroundImage}>
          <img
            className={styles.backgroundPatternIcon}
            alt=""
            src="/Background.png"
          />
          <img
            className={styles.image11Icon}
            loading="lazy"
            alt=""
            src="/image-11@2x.png"
          />
          <img
            className={styles.image9Icon}
            loading="lazy"
            alt=""
            src="/image-9@2x.png"
          />
          <img
            className={styles.image10Icon}
            loading="lazy"
            alt=""
            src="/image-10@2x.png"
          />
        </div>
        <HealthWellness />
      </div>
    </div>
  );
};

export default OurServices;


