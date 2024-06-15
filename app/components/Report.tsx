// src/components/Report.js
import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import styles from '../styles/Report.module.css';

interface ReportProps {
  weight: string;
  general: string;
}

const Report: React.FC<ReportProps> = ({ weight, general }) => {
  const weightPercentage = 100 - parseInt(weight, 10); // assuming weight is a percentage decrease
  const generalPercentage = parseInt(general, 10);

  return (
    <div className={styles.card}>
      <h2 className={styles.heading}>Reports</h2>
      <div className={styles.reportItem}>
      <p className={styles.text}><CircularProgress variant="determinate" value={weightPercentage} className={styles.cir}/> {weight}% decrease</p>
      </div>
      <div className={styles.reportItem}>
      <p className={styles.text}> <CircularProgress variant="determinate" value={generalPercentage} className={styles.cir}/>{general}% increase</p>
      </div>
    </div>
  );
};

export default Report;
