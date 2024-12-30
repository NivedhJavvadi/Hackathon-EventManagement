import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Card, CardContent, CardActions, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Box } from '@mui/material';
import { getTasks, createTask, updateTask, deleteTask } from '../services/api';

const TaskTracker = () => {
  const [tasks, setTasks] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentTask, setCurrentTask] = useState({ title: '', description: '', status: 'To Do' });

  // Fetch tasks from the database
  useEffect(() => {
    const fetchTasks = async () => {
      const fetchedTasks = await getTasks();
      setTasks(fetchedTasks || []);
    };
    fetchTasks();
  }, []);

  const handleSave = async () => {
    try {
      if (currentTask.id) {
        // Update existing task
        await updateTask(currentTask.id, currentTask);
      } else {
        // Add new task
        await createTask(currentTask);
      }
      const fetchedTasks = await getTasks();
      setTasks(fetchedTasks || []);
      setOpenDialog(false);
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      const fetchedTasks = await getTasks();
      setTasks(fetchedTasks || []);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleMoveTask = async (taskId, newStatus) => {
    try {
      const taskToUpdate = tasks.find(task => task.id === taskId);
      if (taskToUpdate) {
        await updateTask(taskId, { ...taskToUpdate, status: newStatus });
        const fetchedTasks = await getTasks();
        setTasks(fetchedTasks || []);
      }
    } catch (error) {
      console.error('Error moving task:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ my: 3 }}>
        Task Tracker
      </Typography>
      <Button variant="contained" color="primary" onClick={() => setOpenDialog(true)}>
        Add Task
      </Button>

      <Grid container spacing={3} sx={{ my: 3 }}>
        {['To Do', 'In Progress', 'Completed'].map((status) => (
          <Grid item xs={12} sm={4} key={status}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', border: '1px solid #ccc', borderRadius: '5px', padding: '10px' }}>
              <Typography variant="h6" sx={{ marginBottom: '10px' }}>
                {status}
              </Typography>
              {tasks.filter(task => task.status === status).map(task => (
                <Card key={task.id} sx={{ marginBottom: '10px', width: '100%' }}>
                  <CardContent>
                    <Typography variant="h6">{task.title}</Typography>
                    <Typography variant="body2" color="textSecondary">{task.description}</Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary" onClick={() => { setCurrentTask(task); setOpenDialog(true); }}>
                      Edit
                    </Button>
                    <Button size="small" color="secondary" onClick={() => handleDelete(task.id)}>
                      Delete
                    </Button>
                    <Button size="small" onClick={() => handleMoveTask(task.id, status === 'To Do' ? 'In Progress' : status === 'In Progress' ? 'Completed' : 'To Do')}>
                      Move {status === 'To Do' ? 'to In Progress' : status === 'In Progress' ? 'to Completed' : 'to To Do'}
                    </Button>
                  </CardActions>
                </Card>
              ))}
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* Dialog for Add/Edit Task */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>{currentTask.id ? 'Edit Task' : 'Add Task'}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="dense"
            label="Title"
            value={currentTask.title}
            onChange={(e) => setCurrentTask({ ...currentTask, title: e.target.value })}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Description"
            value={currentTask.description}
            onChange={(e) => setCurrentTask({ ...currentTask, description: e.target.value })}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Status"
            select
            value={currentTask.status}
            onChange={(e) => setCurrentTask({ ...currentTask, status: e.target.value })}
            SelectProps={{
              native: true,
            }}
          >
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </TextField>
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

export default TaskTracker;