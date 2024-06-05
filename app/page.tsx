"use client"

import { useState } from 'react'
import { ChartData } from 'chart.js';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import clsx from 'clsx';
import StackedBarChart from "@/ui/stackedBarChart";

const initialData: ChartData<'bar'> = {
  labels: [],
  datasets: [],
};

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const App = () => {
  const [data, setData] = useState<ChartData<'bar'>>(initialData);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ date: '', name: '', value: '' });

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { date, name, value } = formData;
    const newValue = parseFloat(value);
    const year = new Date(date).getFullYear().toString();

    if (!isNaN(newValue)) {
      let newLabels = [...data.labels as string[]];
      let newDatasets = [...data.datasets  as ChartData<'bar'>['datasets']];

      // Add year to labels if it doesn't exist
      if (!newLabels.includes(year)) {
        newLabels.push(year);
        newLabels.sort((a, b) => parseInt(a) - parseInt(b));
      }

      // Find or create dataset for the record name
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

      // Update the dataset with the new value
      const yearIndex = newLabels.indexOf(year);
      const currentData = dataset.data[yearIndex];
      const updatedValue = typeof currentData === 'number' ? currentData : currentData![0];
      dataset.data[yearIndex] = updatedValue + newValue;

      // Ensure all datasets have the correct length and are in sync with labels
      newDatasets = newDatasets.map(dataset => ({
        ...dataset,
        data: newLabels.map((label, index) => dataset.data[newLabels.indexOf(label)] || 0),
      }));

      setData({ labels: newLabels, datasets: newDatasets });
    }

    handleClose();
  };

  return (
    <main className={clsx("min-h-screen p-24 text-center")}>
      <div className={clsx("font-black text-6xl")}>
        WELCOME TO RPG
      </div>
      <div className={clsx("font-bold text-2xl")}>
        ようこそ、RPGへ
      </div>
      <Button variant="outlined" onClick={handleClickOpen}>
        経験値登録
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Record</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              autoFocus
              margin="dense"
              name="date"
              label="Date"
              type="date"
              fullWidth
              value={formData.date}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              margin="dense"
              name="name"
              label="Record Name"
              type="text"
              fullWidth
              value={formData.name}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              name="value"
              label="Experience Value"
              type="number"
              fullWidth
              value={formData.value}
              onChange={handleChange}
            />
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button type="submit" color="primary">
                Save
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>

      <div className={clsx("p-4")}>
        <StackedBarChart data={data} />
      </div>
    </main>
  );
}

export default App;
