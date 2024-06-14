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
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Colors, Legend, Tooltip)


interface StackedBarChartProps {
  data: ChartData<'bar'>;
}

const StackedBarChart: React.FC<StackedBarChartProps> = ({ data }) => {
  return <Bar options={options} data={data} />;
};

export const options: ChartOptions<'bar'> = {
  plugins: {
    title: {
      display: true,
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

export default StackedBarChart;
