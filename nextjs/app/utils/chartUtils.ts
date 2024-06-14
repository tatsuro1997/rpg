import { ChartData } from 'chart.js';

export const generateChartDataFromRecords = (records: { date: string, name: string, value: string }[]): ChartData<'bar'> => {
  const labelsSet: Set<string> = new Set();
  const datasets: { [key: string]: { label: string, data: { [year: string] :number }, backgroundColor: string, borderColor: string, borderWidth: number } } = {};

  records.forEach(record => {
    const year = new Date(record.date).getFullYear().toString();
    const value = parseFloat(record.value);

    labelsSet.add(year);

    if (!datasets[record.name]) {
      datasets[record.name] = {
        label: record.name,
        data: {},
        backgroundColor: getRandomColor(),
        borderColor: getRandomColor(),
        borderWidth: 1,
      };

    }
    datasets[record.name].data[year] = (datasets[record.name].data[year] || 0) + value;
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
