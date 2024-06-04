"use client"

import { faker } from '@faker-js/faker'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ChartOptions,
  ChartData,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement)

export const options: ChartOptions<'line'> = {}

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July']
export const data: ChartData<'line'> = {
  labels,
  datasets: [
    {
      data: labels.map(() => faker.number.int({ min: -100, max: 1000 })),
    },
  ],
}

export default function LineChart(): JSX.Element {
  return <Line options={options} data={data} />
}
