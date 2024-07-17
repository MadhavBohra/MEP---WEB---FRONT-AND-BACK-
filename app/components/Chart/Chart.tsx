'use client';
import * as React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import styles from './BarChart.module.css';
import cookie from 'cookie';

const chartSetting = {
  yAxis: [
    {
      label: '',
    },
  ],
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: 'translate(-20px, 0)',
    },
  },
};

const valueFormatter = (value: number | null) => `${value}mm`;

const fetchData = async (userId: string) => {
  try {
    const response = await axios.get(`http://localhost:3001/api/v1/${userId}/daily/chart`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

interface DataPoint {
  water: number;
  steps: number;
  Calories: number;
  month: string;
}

interface DecodedToken {
  userId: string;
}

const getUserIdFromToken = (): string | null => {
  if (typeof document !== 'undefined') {
    const cookies = cookie.parse(document.cookie);
    const token = cookies.token;
    if (token) {
      try {
        const decoded: DecodedToken = jwtDecode(token);
        return decoded.userId;
      } catch (error) {
        console.error('Error decoding token:', error);
        return null;
      }
    }
  }
  return null;
};

const BarsDataset: React.FC = () => {
  const [dataset, setDataset] = useState<any[]>([]); // Adjusted type
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const id = getUserIdFromToken();
    if (id) {
      setUserId(id);
    }
  }, []);

  useEffect(() => {
    const getData = async () => {
      if (userId) {
        const data = await fetchData(userId);
        if (data) {
          setDataset(data);
        }
      }
    };
    getData();
  }, [userId]);

  return (
    <div className={styles.chartContainer}>
      <BarChart
        dataset={dataset}
        xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
        series={[
          { dataKey: 'water', label: 'Water', valueFormatter, color: 'green' },
          { dataKey: 'steps', label: 'Steps', valueFormatter, color: 'blue' },
          { dataKey: 'Calories', label: 'Calories', valueFormatter, color: 'purple' },
        ]}
        {...chartSetting}
      />
    </div>
  );
};

export default BarsDataset;

