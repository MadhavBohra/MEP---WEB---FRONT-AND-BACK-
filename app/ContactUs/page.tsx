'use client';

import { FunctionComponent } from "react";
import ProductSupport from "../components/ProductSupport/ProductSupport";
import SocialMedia from "../components/SocialMedia/SocialMedia";
import React, { useState, useEffect } from "react";
import styles from './Contact.module.css';
//import Header from "../components/LandingHeader/Header";
import LandingHeader from "../components/LandingHeader/Header";
import UserDashboardHeader from "../components/UserDashboardHeader/Header";

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


const Contact: FunctionComponent = () => {
  return (
    <div className={styles.contact}>
      <LandingHeader />
      <div className={styles.productSupportWrapper}>
        <ProductSupport />
      </div>
      <div className={styles.contactChild} />
      <div className={styles.contactItem} />
      <div className={styles.contactInner} />
      <div className={styles.twitter}>
        <p className={styles.twitter1}>Twitter</p>
      </div>
      <div className={styles.instagram}>Instagram</div>
      <div className={styles.linkedin}>
        <p className={styles.linkedin1}>Linkedin</p>
        <p className={styles.blankLine}>&nbsp;</p>
      </div>
      <div className={styles.facebook}>Facebook</div>
      <SocialMedia />
      <div className={styles.footer}>
        <img
          className={styles.backgroundPatternIcon}
          alt=""
          src="/background.png"
        />
        <img
          className={styles.footerChild}
          loading="lazy"
          alt=""
          src="/line-12.svg"
        />
      </div>
    </div>
  );
};

export default Contact;
