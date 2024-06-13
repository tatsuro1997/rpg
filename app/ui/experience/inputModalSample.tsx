"use client"

import { useState } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import clsx from 'clsx';

interface InputModalProps {
  addRecord: (date: string, name: string, value: string) => void;
}

const InputModal: React.FC<InputModalProps>  = ({ addRecord }) => {
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
    addRecord(formData.date, formData.name, formData.value);
    handleClose();
  };

  return (
    <>
      <Button
        className={clsx("my-4")}
        variant="outlined"
        onClick={handleClickOpen}>
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
    </>
  )
}

export default InputModal;
