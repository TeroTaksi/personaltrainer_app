import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  TextField,
} from "@mui/material";

function AddTraining(props) {
  const [open, setOpen] = useState(false);
  const [training, setTraining] = useState({
    date: "",
    duration: "",
    activity: "",
    customer: props.customer.value, // https://customerrest.herokuapp.com/api/customers/{id}
  });

  const addTraining = (training) => {
    fetch("https://customerrest.herokuapp.com/api/trainings", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(training),
    }).catch((err) => console.error(err));
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    addTraining(training);
    handleClose();
  };

  const inputChanged = (e) => {
    setTraining({ ...training, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <Button onClick={handleClickOpen}>ADD TRAINING</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>ADD TRAINING</DialogTitle>
        <DialogContent>
          <TextField
            mardin="dense"
            name="date"
            value={training.date}
            onChange={inputChanged}
            label="Date (YYYY-MM-DD)" //"Date"
            fullWidth
            variant="standard"
          />
          <TextField
            mardin="dense"
            name="duration"
            value={training.duration}
            onChange={inputChanged}
            label="Duration"
            fullWidth
            variant="standard"
          />
          <TextField
            mardin="dense"
            name="activity"
            value={training.activity}
            onChange={inputChanged}
            label="Activity"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddTraining;
