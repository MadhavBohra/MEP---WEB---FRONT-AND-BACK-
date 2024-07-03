'use client';

import { FunctionComponent } from "react";
import ProductSupport from "../components/ProductSupport/ProductSupport";
import SocialMedia from "../components/SocialMedia/SocialMedia";
import React, { useState, useEffect } from "react";
import styles from './Contact.module.css';
<<<<<<< HEAD
=======
//import Header from "../components/LandingHeader/Header";
>>>>>>> 1db6ed7c71c8a3c9f77a84bf7bfb35ddf42f7d04
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
<<<<<<< HEAD
    <div>
=======
    <div className={styles.headercomp}>
>>>>>>> 1db6ed7c71c8a3c9f77a84bf7bfb35ddf42f7d04
      {authState.authenticated ? <UserDashboardHeader /> : <LandingHeader />}
    </div>
  );
};

<<<<<<< HEAD
const Contact: FunctionComponent = () => {
  return (
    <div>
    <HeaderComponent />
    <div className={styles.container}>
      <div className={styles.components}>
        
        <div className={styles.productsupport}>
          <p>Have questions about our products, support services, or
            anything else? Let us know and we'll get back to you.</p>
        </div>
        <div className={styles.address}>
          <h3>Corporate Address:</h3>
          <p>Myeasypharma Pvt Ltd
            Unit 101, Oxford Towers 139, HAL Old Airport Rd H.A.L II Stage Bangalore, Karnataka, India, 560008</p>
          <h3>Operating Address:</h3>
          <p>252, Upper Ground Floor. Deepali, Pitampura,
            Delhi-110034</p>
        </div>
        <div className={styles.contact}>
          <h3>Contacts</h3>
          <p>Contact:
            Email: info@myeasypharma.in
            Phone: +91-9315909654</p>
        </div>
        <div className={styles.social}>
          <img src="/socialx.png" alt="x"/>
          <img src="/socialfacebook.png" alt="facebook"/>
          <img src="/socialinsta.png" alt="instagram"/>
          <img src="/sociallinkedin.png" alt="linkedin"/>
        </div>
      </div>
    </div>
=======

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
>>>>>>> 1db6ed7c71c8a3c9f77a84bf7bfb35ddf42f7d04
    </div>
  );
};

export default Contact;
