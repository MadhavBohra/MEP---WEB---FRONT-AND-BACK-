'use client'

import React, { useState, useEffect } from "react";
import MissionContainer from "../components/MissionContainer/MissionContainer";
import styles from "./AboutUs.module.css";
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


    <div className={styles.aboutUs1}>
      <HeaderComponent />
      <img
        className={styles.backgroundPatternIcon}
        alt=""
        src="/Background.png"
      />
      <div className={styles.myeasypharmaIsAtContainer} >
        MyEasyPharma is at the forefront of merging technology with
        healthcare to innovate preventive health measures for working
        professionals.
      </div>
      <div className={styles.visionDetails}>
        <div className={styles.vision}>Vision</div>
        At MyEasyPharma, our vision is to pioneer a shift in global health
        paradigms, focusing not just on treating illnesses but on preventing
        them before they occur.We primarily aim for improved employee
        health which leads to increased and enhanced efficiency at the
        workplace.
      </div>
      <div className={styles.missionDetails}>
        <div className={styles.mission}>Mission</div>
        We provide comprehensive professional Health advice
        on parameters such as diet, physical activity, ideal screen time
        and others which reducing susceptibility to Workplace-induced
        lifestyle disorders.
      </div>
    </div>
  );
};

export default AboutUs;