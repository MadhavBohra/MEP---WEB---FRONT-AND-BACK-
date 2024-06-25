'use client';

import React from "react";
import { StoreProvider } from "../StoreProvider";
import Link from "next/link";
import styles from "./LandingPage.module.css";
import Header from "../components/LandingHeader/Header";

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
                <Link href='/OurServices'><button className={styles.b2}>&#x25BC; Our Services</button></Link>
                
              </div>
            </body>
          </html>
        </StoreProvider>
      );
}