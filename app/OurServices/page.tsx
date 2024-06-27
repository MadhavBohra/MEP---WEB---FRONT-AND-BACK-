import React from "react";
import HealthWellness from "../components/HealthWellness/HealthWellness";
import styles from "./OurServices.module.css";
import Header from "../components/Header/Header";

const OurServices: React.FC = () => {
  return (
    <div className={styles.root}>
      <Header />
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


