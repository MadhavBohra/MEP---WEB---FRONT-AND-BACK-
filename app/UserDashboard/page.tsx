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
import Header from '../components/UserDashboardHeader/Header';
import axios from 'axios';
import { getSession } from 'next-auth/react';
import Modal from '../components/Modal/Modal';

interface UserData {
  name: string;
  age: number;
  height: string;
  weight: string;
  blood_grp: string;
  address: string;
  calories_burnt?: number;
  steps?: number;
  water_intake?: number;
}

const defaultUser: UserData = {
  name: 'Manan Jain',
  age: 20,
  height: '174',
  weight: '70',
  blood_grp: 'B+',
  address: 'BITS GOA',
};

const fetchDataFromDB = async (): Promise<UserData | null> => {
  try {
    const res = await axios.get('/api/users');
    return res.data;
  } catch (error) {
    console.error('Error fetching data from the database:', error);
    return null;
  }
};

export default function UserDashboard() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchDataFromDB();
      if (data) {
        setUserData(data);
      } else {
        setUserData(defaultUser);
      }
    };
    getData();
  }, []);

  const handleModalSave = (steps: string, waterIntake: string, caloriesBurnt: string) => {
    setUserData((prevState) => {
      if (!prevState) return prevState;
      return {
        ...prevState,
        steps: parseInt(steps),
        water_intake: parseInt(waterIntake),
        calories_burnt: parseInt(caloriesBurnt),
      };
    });
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <StoreProvider>
      <Head>
        <title>Dashboard Overview</title>
        <link href="/fonts" rel="stylesheet" />
      </Head>
      <div className={styles.background}>
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
                <Report weight={userData.weight} general="78" />
                <StepCounter name="Steps Taken" steps={userData.steps?.toString() || "0"} />
                <CalorieCounter name="Calories Burned" calories={userData.calories_burnt?.toString() || "0"} />
                <Watertaken name="Water Taken" water={userData.water_intake?.toString() || "0"} />
                <button onClick={() => setIsModalOpen(true)}>Update Data</button>
                <Modal
                  isOpen={isModalOpen}
                  onClose={() => setIsModalOpen(false)}
                  onSave={handleModalSave}
                />
                <div className={styles.vl}></div>
              </section>
            </div>
          </main>
        </div>
      </div>
    </StoreProvider>
  );
}
