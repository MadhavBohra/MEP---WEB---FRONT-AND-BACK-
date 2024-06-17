import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';

const chartSetting = {
  yAxis: [
    {
      label: '',
    },
  ],
  width: 500,
  height: 300,
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: 'translate(-20px, 0)',
    },
  },
};
const dataset = [
  {
    water: 59,
    steps: 57,
    Calories: 86,
    month: 'Jan',
  },
  {
    water: 50,
    steps: 52,
    Calories: 78,
    month: 'Fev',
  },
  {
    water: 47,
    steps: 53,
    Calories: 106,
    month: 'Mar',
  },
  {
    water: 54,
    steps: 56,
    Calories: 92,
    month: 'Apr',
  },
  {
    water: 57,
    steps: 69,
    Calories: 92,
    month: 'May',
  },
  {
    water: 60,
    steps: 63,
    Calories: 103,
    month: 'June',
  },
  {
    water: 59,
    steps: 60,
    Calories: 105,
    month: 'July',
  },
  {
    water: 65,
    steps: 60,
    Calories: 106,
    month: 'Aug',
  },
  {
    water: 51,
    steps: 51,
    Calories: 95,
    month: 'Sept',
  },
  {
    water: 60,
    steps: 65,
    Calories: 97,
    month: 'Oct',
  },
  {
    water: 67,
    steps: 64,
    Calories: 76,
    month: 'Nov',
  },
  {
    water: 61,
    steps: 70,
    Calories: 103,
    month: 'Dec',
  },
];

const valueFormatter = (value: number | null) => `${value}mm`;

export default function BarsDataset() {
  return (
    <BarChart
      dataset={dataset}
      xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
      series={[
        { dataKey: 'water', label: 'Water', valueFormatter },
        { dataKey: 'steps', label: 'Steps', valueFormatter },
        { dataKey: 'Calories', label: 'Calories', valueFormatter },
      ]}
      {...chartSetting}
    />
  );
}
