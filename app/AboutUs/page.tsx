'use client'

import React, { useState, useEffect, FunctionComponent } from "react";
//import classnames from "classnames";
import styles from "./AboutUs.module.css";
import './fonts.css';
import LandingHeader from "../components/LandingHeader/Header";
import UserDashboardHeader from "../components/UserDashboardHeader/Header";

// Define the MissionContainer component within the AboutUs file
export type MissionContainerType = {
  className?: string;
};

const MissionContainer: FunctionComponent<MissionContainerType> = ({
  className = "",
}) => {
  return (
    <section className={(styles.missionContainer, className)}>
      <article className={styles.missionDetails}>
        <div className={styles.missionElaboration}>
          <section className={styles.missionScope}>
            <h2 className={styles.whatWeDo}>What We Do</h2>
            <p className={styles.whatWeDoDescription}>
              <span className={styles.weProvideComprehensive}>
                We provide comprehensive professional health advice on parameters such as diet, physical activity, ideal screen time, and others which reduce susceptibility to workplace-induced lifestyle disorders.
              </span>
            </p>
          </section>
        </div>
        <img
          className={styles.image8Icon}
          loading="lazy"
          alt="Health and Wellness Illustration"
          src="/Stethoscope.jpg"
        />
        <aside className={styles.socialImpact}>
          <div className={styles.socialProofContainer}>
            <img
              className={styles.socialIcon}
              loading="lazy"
              alt="Social Media Icon"
              src="/social.svg"
            />
            <div className={styles.testimonials}>
              <img
                className={styles.socialIcon1}
                loading="lazy"
                alt="Social Proof 1"
                src="/social-1.svg"
              />
            </div>
            <div className={styles.testimonials1}>
              <img
                className={styles.socialIcon2}
                loading="lazy"
                alt="Social Proof 2"
                src="/social-2@2x.png"
              />
            </div>
            <div className={styles.testimonials2}>
              <img
                className={styles.socialIcon3}
                loading="lazy"
                alt="Social Proof 3"
                src="/social-3@2x.png"
              />
            </div>
          </div>
        </aside>
      </article>
      <div className={styles.visionContentWrapper}>
        <article className={styles.visionContent}>
          <section className={styles.visionStatement}>
            <div className={styles.visionDetails}>
              At MyEasyPharma, our vision is to pioneer a shift in global health
              paradigms, focusing not just on treating illnesses but on preventing
              them before they occur. We primarily aim for improved employee
              health which leads to increased and enhanced efficiency at the
              workplace.
            </div>
          </section>
          <img
            className={styles.image12Icon}
            loading="lazy"
            alt="Vision Illustration"
            src="Vision.jpg"
          />
        </article>
      </div>
    </section>
  );
};

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

// HeaderComponent to handle authentication state and headers
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

// Main AboutUs component
const AboutUs: React.FC = () => {
  return (
    <div className={styles.background}>
      <HeaderComponent />
      <div className={styles.pagedetails}>
        <div className={styles.heading}> 
          <h2 className={styles.headtext}>MyEasyPharma is at the forefront of merging technology with healthcare to innovate preventive health measures for working professionals.</h2>
          <h3 className={styles.vishead}>Vision</h3>
          <p className={styles.vistext}>At MyEasyPharma, our vision is to pioneer a shift in global health paradigms, focusing not just on treating illnesses but on preventing them before they occur.We primarily aim for improved employee health which leads to increased and enhanced efficiency at the workplace.</p>
          <img src="/Vision.png" alt="Vision" className={styles.visimg}/>
          <h3 className={styles.whathead}>What We Do?</h3>
          <p className={styles.whattext}>We provide comprehensive professional Health advice on parameters such as diet, physical activity, ideal screen time and others which reducing susceptibility to Workplace-induced lifestyle disorders.</p>
          <img src="/Stethoscope.png" alt="Steth" className={styles.whatimg}/>
          <h3 className={styles.misshead}>Mission</h3>
          <p className={styles.misstext}>Through our efforts, we aim to reduce the burden of chronic diseases and elevate public health standards through a specialised and well-curated corporate wellness.</p>
          <img src="/Mission.png" alt="mission" className={styles.missimg}/>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
