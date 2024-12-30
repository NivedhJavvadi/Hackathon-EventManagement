import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Card, CardContent, CardActions, Grid, Dialog, TextField, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { getEvents, createEvent, updateEvent, deleteEvent } from '../services/api';

const EventManagement = () => {
  const [events, setEvents] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentEvent, setCurrentEvent] = useState({ name: '', description: '', location: '', date: '' });

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    const { data } = await getEvents();
    setEvents(data);
  };

  const handleSave = async () => {
    if (currentEvent.id) {
      await updateEvent(currentEvent.id, currentEvent);
    } else {
      await createEvent(currentEvent);
    }
    setOpenDialog(false);
    loadEvents();
  };

  const handleDelete = async (id) => {
    await deleteEvent(id);
    loadEvents();
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ my: 3 }}>
        Event Management
      </Typography>
      <Button variant="contained" color="primary" onClick={() => setOpenDialog(true)}>
        Add Event
      </Button>
      <Grid container spacing={3} sx={{ my: 3 }}>
        {events.map((event) => (
          <Grid item xs={12} sm={6} md={4} key={event.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{event.name}</Typography>
                <Typography variant="body2" color="textSecondary" sx={{ my: 1 }}>
                  {event.description}
                </Typography>
                <Typography variant="body2">Location: {event.location}</Typography>
                <Typography variant="body2">Date: {event.date}</Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary" onClick={() => { setCurrentEvent(event); setOpenDialog(true); }}>
                  Edit
                </Button>
                <Button size="small" color="secondary" onClick={() => handleDelete(event.id)}>
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>{currentEvent.id ? 'Edit Event' : 'Add Event'}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="dense"
            label="Name"
            name="name"
            value={currentEvent.name}
            onChange={(e) => setCurrentEvent({ ...currentEvent, name: e.target.value })}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Description"
            name="description"
            value={currentEvent.description}
            onChange={(e) => setCurrentEvent({ ...currentEvent, description: e.target.value })}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Location"
            name="location"
            value={currentEvent.location}
            onChange={(e) => setCurrentEvent({ ...currentEvent, location: e.target.value })}
          />
          <TextField
            fullWidth
            margin="dense"
            type="date"
            name="date"
            value={currentEvent.date}
            onChange={(e) => setCurrentEvent({ ...currentEvent, date: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default EventManagement;