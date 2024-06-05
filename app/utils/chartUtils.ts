import { ChartData } from 'chart.js';

export const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export const addRecord = (
  data: ChartData<'bar'>,
  date: string,
  name: string,
  value: string,
  setData: React.Dispatch<React.SetStateAction<ChartData<'bar'>>>
) => {
  const newValue = parseFloat(value);
  const year = new Date(date).getFullYear().toString();

  if (!isNaN(newValue)) {
    let newLabels = [...data.labels as string[]];
    let newDatasets = [...data.datasets as ChartData<'bar'>['datasets']];

    if (!newLabels.includes(year)) {
      newLabels.push(year);
      newLabels.sort((a, b) => parseInt(a) - parseInt(b));
    }

    let dataset = newDatasets.find(dataset => dataset.label === name);
    if (!dataset) {
      dataset = {
        label: name,
        data: Array(newLabels.length).fill(0),
        backgroundColor: getRandomColor(),
        borderColor: getRandomColor(),
        borderWidth: 1,
      };
      newDatasets.push(dataset);
    }

    const yearIndex = newLabels.indexOf(year);
    const currentData = dataset.data[yearIndex];
    const updatedValue = typeof currentData === 'number' ? currentData : currentData![0];
    dataset.data[yearIndex] = updatedValue + newValue;

    newDatasets = newDatasets.map(dataset => ({
      ...dataset,
      data: newLabels.map((label, index) => dataset.data[newLabels.indexOf(label)] || 0),
    }));

    setData({ labels: newLabels, datasets: newDatasets });
  }
};
