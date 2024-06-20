import { ChartData } from 'chart.js';
import { BaseExperience } from '@/types/Experience'

export const generateChartDataFromExperiences = (experiences: BaseExperience[]): ChartData<'bar'> => {
  const labelsSet: Set<string> = new Set();
  const datasets: { [key: string]: { label: string, data: { [year: string] :number }, backgroundColor: string, borderColor: string, borderWidth: number } } = {};

  experiences.forEach(experience => {
    const year = new Date(experience.date).getFullYear().toString();
    const point = experience.point;

    labelsSet.add(year);

    if (!datasets[experience.title]) {
      datasets[experience.title] = {
        label: experience.title,
        data: {},
        backgroundColor: getRandomColor(),
        borderColor: getRandomColor(),
        borderWidth: 1,
      };

    }
    datasets[experience.title].data[year] = (datasets[experience.title].data[year] || 0) + point;
  });

  const labels = Array.from(labelsSet).sort((a, b) => parseInt(a) - parseInt(b));

  const datasetArray = Object.values(datasets).map(dataset => {
    const data = labels.map(label => dataset.data[label] || 0);
    return { ...dataset, data };
  });

  return {
    labels,
    datasets: datasetArray,
  };
};

const getRandomColor = (): string => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};
