'use client';

import React, { useEffect, useState } from 'react';
import { StoreProvider } from '../StoreProvider';
import Head from 'next/head';
import UsernameCard from '../components/UsernameCard/UsernameCard';
import StepCounter from '../components/StepCounter/Stepcounter';
import CalorieCounter from '../components/CalorieCounter/CalorieCounter';
import Watertaken from '../components/WaterTaken/Watertaken';
import Report from '../components/Report/Report';
import Reminder from '../components/Reminder/Reminders';
import styles from '../styles/layout.module.css';
import BarsDataset from '../components/Chart/Chart';
import ProfileCard from '../components/ProfileCard/ProfileCard';
import Calendar from '../components/Calendar/DatePicker';
import UpcomingEvents from '../components/UpcomingEvent/UpcomingEvent';
import PostWorkoutSessionCard from '../components/PostWorkout/PostWorkout';
import Header from '../components/Header/Header';
import axios from 'axios';

interface UserData {
  name: string;
  age: number;
  height: string;
  weight: string;
  blood_grp: string;
  address: string;
}

interface Props {
  readonly email: string;
}

const defaultUser: UserData = {
  name: 'Manan Jain',
  age: 20,
  height: '174',
  weight: '70',
  blood_grp: 'B+',
  address: 'BITS GOA',
};

export default function UserDashboard({ email }: Props) {
  const [userData, setUserData] = useState<UserData | null>(null);

  const getData = async (email: string) => {
    try {
      const res = await axios.get(`/api/users`, { //change the relation name accordingly
        params: { email }
      });
      const data = res.data;

      if (data) {
        const user: UserData = {
          name: data.name,
          age: data.age,
          height: data.height,
          weight: data.weight,
          blood_grp: data.blood_grp,
          address: data.address,
        };
        setUserData(user);
      } else {
        setUserData(defaultUser);
      }
    } catch (error) {
      console.log(error);
      setUserData(defaultUser);
    }
  };

  useEffect(() => {
    getData(email);
  }, [email]);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <StoreProvider>
      <Head>
        <title>Dashboard Overview</title>
        <link href="/fonts" rel="stylesheet" />
      </Head>
      <html>
        <body className={styles.background}>
          <div className={styles.container}>
            <main className={styles.main}>
              <div className={styles.headercomp}><Header /></div>
              <div className={styles.dashstart}>
                <header className={styles.header}>
                  <h1 className={styles.headerTitle}>Dashboard Overview</h1>
                </header>
                <section className={styles.dashboard}>
                  <UsernameCard
                    name={userData.name}
                    message="Have a nice day and don’t forget to take care of your health!"
                  />
                  <div className={styles.profilecard}>
                    <ProfileCard
                      Name={userData.name}
                      Age={userData.age.toString()}
                      Address={userData.address}
                      Blood_Group={userData.blood_grp}
                      Height={userData.height}
                      Weight={userData.weight}
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
