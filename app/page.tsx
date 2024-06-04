"use client"

import React, { useState } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import clsx from 'clsx';
import { faker } from '@faker-js/faker'
import StackedBarChart from "@/ui/stackedBarChart";

const labels = ['2018', '2019', '2020', '2021', '2022', '2023', '2024']
const initialData = {
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
};

const App = () => {
  const [data, setData] = useState(initialData);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ date: '', name: '', value: '' });

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { date, name, value } = formData;
    const newValue = parseFloat(value);

    if (!isNaN(newValue)) {
      const newLabels = [...data.labels, name];
      const newDatasets = data.datasets.map((dataset) => ({
        ...dataset,
        data: [...dataset.data, newValue],
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
