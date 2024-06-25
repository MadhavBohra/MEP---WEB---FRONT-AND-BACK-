'use client';

import React from "react";
import { StoreProvider } from "../StoreProvider";
import styles from "./LandingPage.module.css";
import Header from "../components/Header/Header";

export default function LandingPage() {
    return (
        <StoreProvider>
          <html>
            <body className={styles.background}>
              <div className={styles.container}>
              <div className={styles.headercomp}><Header /></div>
                <p className={styles.t1}>AI Curated corporate wellness program</p>
                <p className={styles.t2}>MyEasyPharma</p>
                <button className={styles.b1}>Get started for free</button>
                <button className={styles.b2}>&#x25BC; Our Services</button>
              </div>
            </body>
          </html>
        </StoreProvider>
      );
}