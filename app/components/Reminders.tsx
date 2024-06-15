import React from 'react';
import styles from '../styles/Report.module.css';

interface ReminderProps {
  ex1: string;
  ex2: string;
}

const Reminder: React.FC<ReminderProps> = ({ ex1, ex2 }) => {

  return (
    <div className={styles.card}>
      <h2 className={styles.heading}>Reminders</h2>
      <div className={styles.ReminderItem}>
      <p className={styles.text}></p>
      </div>
      <div className={styles.ReminderItem}>
      <p className={styles.text}></p>
      </div>
    </div>
  );
};

export default Reminder;
