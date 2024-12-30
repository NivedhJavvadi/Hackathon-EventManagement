import React from 'react';
import { AppBar, Toolbar, Typography, Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Event Management Dashboard
        </Typography>
        <Grid container spacing={2}>
          <Grid item>
            <Button color="inherit" component={Link} to="/events">
              Events
            </Button>
          </Grid>
          <Grid item>
            <Button color="inherit" component={Link} to="/attendees">
              Attendees
            </Button>
          </Grid>
          <Grid item>
            <Button color="inherit" component={Link} to="/tasks">
              Tasks
            </Button>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;