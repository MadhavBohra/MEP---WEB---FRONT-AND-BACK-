'use client';

import React, { useEffect, useState } from 'react';
import { StoreProvider } from '../StoreProvider';
import UsernameCard from '../components/UsernameCard/UsernameCard';
import StepCounter from '../components/StepCounter/Stepcounter';
import CalorieCounter from '../components/CalorieCounter/CalorieCounter';
import Watertaken from '../components/WaterTaken/Watertaken';
import Report from '../components/Report/Report';
import Reminder from '../components/Reminder/Reminders';
import styles from './UserDashboard.module.css';
import BarsDataset from '../components/Chart/Chart';
import ProfileCard from '../components/ProfileCard/ProfileCard';
import Calendar from '../components/Calendar/DatePicker';
import UpcomingEvents from '../components/UpcomingEvent/UpcomingEvent';
import PostWorkoutSessionCard from '../components/PostWorkout/PostWorkout';
import Header from '../components/UserDashboardHeader/Header';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import Modal from '../components/Modal/Modal';
import cookie from 'cookie';

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

const decodeUserIdAndEmailFromToken = (token: string): { userId: string, email: string } | null => {
  try {
    const decoded: any = jwtDecode(token);
    return {
      userId: decoded.userId, // Adjust according to your token's payload structure
      email: decoded.email // Adjust according to your token's payload structure
    };
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

const fetchDataFromDB = async (userId: string): Promise<UserData | null> => {
  try {
    const res = await axios.get(`http://localhost:3001/api/v1/users/${userId}/health`);
    return res.data;
  } catch (error) {
    console.error('Error fetching data from the database:', error);
    return null;
  }
};

export default function UserDashboard() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchToken = async () => {
      // This is how you can retrieve cookies in a Next.js environment
      if (typeof document !== 'undefined') {
        const cookies = document.cookie;
        const parsedCookies = cookie.parse(cookies);
        setToken(parsedCookies.token || null);
      }
    };
    fetchToken();
  }, []);

  useEffect(() => {
    const getData = async () => {
      if (token) {
        const decoded = decodeUserIdAndEmailFromToken(token);
        if (decoded) {
          const data = await fetchDataFromDB(decoded.userId);
          if (data) {
            setUserData(data);
          } else {
            setUserData(defaultUser);
          }
        }
      }
    };
    getData();
  }, [token]);

  const handleModalSave = (steps: string, waterIntake: string, caloriesBurnt: string) => {
    if (!token) {
      console.error('Token not available');
      return;
    }

    const decoded = decodeUserIdAndEmailFromToken(token);

    if (!decoded) {
      console.error('Unable to decode token');
      return;
    }

    const { userId } = decoded;

    setUserData((prevState: UserData | null) => {
      if (!prevState) return prevState;
      const updatedData = {
        ...prevState,
        steps: parseInt(steps),
        water_intake: parseInt(waterIntake),
        calories_burnt: parseInt(caloriesBurnt),
      };

      axios.put(`http://localhost:3001/api/v1/users/${userId}/daily`, updatedData)
        .then((response) => {
          console.log('Data saved successfully:', response.data);
        })
        .catch((error) => {
          console.error('Error saving data:', error);
        });

      return updatedData;
    });
  };

  if (!userData || !token) {
    return <div>Loading...</div>;
  }

  return (
    <StoreProvider>
      <div className={styles.background}>
        <div className={styles.headercomp}><Header /></div>
        <div className={styles.container}>
          <h1 className={styles.headerTitle}>Dashboard Overview</h1>
          <section className={styles.dashboard}>
            <div className={styles.usernamecard}>
              <UsernameCard
                name={userData.name}
                message="Have a nice day and don’t forget to take care of your health!"
              />
            </div>
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
            <div className={styles.reminder}>
              <Reminder dur1="48 min" ex1="stretching" dur2="32 min" ex2="Mind training" />
            </div>
            <div className={styles.upcomingevent}><UpcomingEvents /></div>
            <div className={styles.postWorkoutSessionCard}><PostWorkoutSessionCard /></div>
            <div className={styles.report}><Report weight={userData.weight} /></div>
            <div className={styles.stepcounter}><StepCounter name="Steps Taken" steps={userData.steps?.toString() || "0"} /></div>
            <div className={styles.caloriecounter}><CalorieCounter name="Calories Burned" calories={userData.calories_burnt?.toString() || "0"} /></div>
            <div className={styles.watertaken}><Watertaken name="Water Taken" water={userData.water_intake?.toString() || "0"} /></div>
            <button className={styles.updateButton} onClick={() => setIsModalOpen(true)}>Update Data</button>
            <Modal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              onSave={(steps, waterIntake, caloriesBurnt) => handleModalSave(steps, waterIntake, caloriesBurnt)}
            />
            <div className={styles.vl}></div>
          </section>
        </div>
      </div>
    </StoreProvider>
  );
}
