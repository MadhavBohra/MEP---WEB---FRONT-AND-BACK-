'use client'

import { FunctionComponent } from "react";
import React, { useState, useEffect } from "react";
import MissionContainer from "../components/MissionContainer/MissionContainer";
import styles from "./AboutUs.module.css";
//import Header from "../components/LandingHeader copy/Header";
import './fonts.css';
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


const AboutUs: React.FC = () => {
  return (
    <div className={styles.aboutUs}>
      <HeaderComponent />
      <div className={styles.aboutUs1}>
        <img
          className={styles.backgroundPatternIcon}
          alt=""
          src="/background-pattern@2x.png"
        />
        <div className={styles.mission}>Mission</div>
        <MissionContainer />
        <img
          className={styles.image7Icon}
          loading="lazy"
          alt=""
          src="/image-7@2x.png"
        />
        <div className={styles.visionDetails}>
          <div className={styles.vision}>Vision</div>
          <div className={styles.atMyeasypharmaOur}>
            At MyEasyPharma, our vision is to pioneer a shift in global health
            paradigms, focusing not just on treating illnesses but on preventing
            them before they occur. We primarily aim for improved employee
            health which leads to increased and enhanced efficiency at the
            workplace.
          </div>
        </div>
        <b className={styles.myeasypharmaIsAtContainer} >
          <p className={styles.myeasypharmaIsAt} >
            MyEasyPharma is at the forefront of merging technology with
            healthcare to innovate preventive health measures for working
            professionals.
          </p>
        </b>
      </div>
    </div>
  );
};

export default AboutUs;