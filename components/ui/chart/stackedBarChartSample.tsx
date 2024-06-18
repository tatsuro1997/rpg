"use client"

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ChartOptions,
  ChartData,
  Title,
  Colors,
  Legend,
  Tooltip,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { faker } from '@faker-js/faker'
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Colors, Legend, Tooltip)


interface StackedBarChartProps {
  data: ChartData<'bar'>;
}

const StackedBarChart: React.FC<StackedBarChartProps> = () => {
  return <Bar options={options} data={data} />;
};

export const options: ChartOptions<'bar'> = {
  plugins: {
    title: {
      display: true,
      text: 'Stacked Bar Chart',
    },
    legend: {
      position: 'top',
    },
    tooltip: {
      enabled: true,
      mode: 'index',
      intersect: false,
      backgroundColor: 'rgba(0,0,0,0.8)',
      borderColor: 'rgba(0,0,0,1)',
      borderWidth: 1,
      callbacks: {
        label: function(context) {
          let label = context.dataset.label || '';
          if (label) {
            label += ': ';
          }
          label += Math.round(context.parsed.y * 100) / 100;
          return label;
        },
      },
    },
  },
  responsive: true,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
      beginAtZero: true,
    },
  },
}

const labels = ['2018', '2019', '2020', '2021', '2022', '2023', '2024']
export const data: ChartData<'bar'> = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: labels.map(() => faker.number.int({ min: 0, max: 100 })),
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
    },
    {
      label: 'Dataset 2',
      data: labels.map(() => faker.number.int({ min: 0, max: 100 })),
      backgroundColor: 'rgba(153, 102, 255, 0.2)',
      borderColor: 'rgba(153, 102, 255, 1)',
      borderWidth: 1,
    },
    {
      label: 'Dataset 3',
      data: labels.map(() => faker.number.int({ min: 0, max: 100 })),
      backgroundColor: 'rgba(255, 159, 64, 0.2)',
      borderColor: 'rgba(255, 159, 64, 1)',
      borderWidth: 1,
    },
  ],
}

export default StackedBarChart;
