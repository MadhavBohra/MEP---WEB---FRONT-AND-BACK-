'use client';

import React, { ReactNode } from 'react';
import { StoreProvider } from './StoreProvider';
import Head from 'next/head';
import UsernameCard from './components/UsernameCard';
import StepCounter from './components/StepCounter';
import CalorieCounter from './components/CalorieCounter';
import Watertaken from './components/Watertaken';
import Report from './components/Report';
import Reminder from './components/Reminders';
import styles from './styles/Layout.module.css';
import BarsDataset from './components/Chart';
import ProfileCard from './components/ProfileCard';
import Calendar from './components/DatePicker';
import UpcomingEvents from './components/UpcomingEvent';
import PostWorkoutSessionCard from './components/PostWorkout';
import Header from './components/Header';

interface Props {
  readonly children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <StoreProvider>
      <Head>
        <title>Dashboard Overview</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Lufga:wght@400&display=swap"
          rel="stylesheet"
        />
      </Head>
      <html>
        <body className={styles.background}>
          <div className={styles.container}>
            <main className={styles.main}>
              <Header />
              <div className={styles.dashstart}>
                <header className={styles.header}>
                  <h1 className={styles.headerTitle}>Dashboard Overview</h1>
                </header>
                <section className={styles.dashboard}>
                  <UsernameCard
                    name="Manan Jain"
                    message="Have a nice day and don’t forget to take care of your health!"
                  />
                  <div className={styles.profilecard}>
                    <ProfileCard
                      Name="Manan Jain"
                      Age="20"
                      Address="BITS Goa"
                      Blood_Group="B+"
                      Height="170cm"
                      Weight="70kg"
                    />
                  </div>
                  <div className={styles.datepicker}><Calendar /></div>
                  <div className={styles.graph}><BarsDataset /></div>
                  <Reminder dur1="48 min" ex1="stretching" dur2="32 min" ex2="Mind training" />
                  <div className={styles.upcomingevent}><UpcomingEvents /></div>
                  <div className={styles.postWorkoutSessionCard}><PostWorkoutSessionCard /></div>
                  <Report weight="87" general="78" />
                  <StepCounter name="Steps Taken" steps="202" />
                  <CalorieCounter name="Calories Burned" calories="408" />
                  <Watertaken name="Water Taken" water="8" />
                  <div className={styles.vl}></div>
                </section>
              </div>
            </main>
          </div>
        </body>
      </html>
    </StoreProvider>
  );
}
