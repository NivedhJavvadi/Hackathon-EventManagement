import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Card, CardContent, CardActions, Grid, Dialog, TextField, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { getAttendees, createAttendee, updateAttendee, deleteAttendee } from '../services/api';

const AttendeeManagement = () => {
  const [attendees, setAttendees] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentAttendee, setCurrentAttendee] = useState({ firstName: '', lastName: '', email: '', phone: '' });

  useEffect(() => {
    loadAttendees();
  }, []);

  const loadAttendees = async () => {
    try {
      const data = await getAttendees();
      setAttendees(data);
    } catch (error) {
      console.error('Error loading attendees', error);
    }
  };

  const handleSave = async () => {
    try {
      if (currentAttendee.id) {
        await updateAttendee(currentAttendee.id, currentAttendee);
      } else {
        await createAttendee(currentAttendee);
      }
      setOpenDialog(false);
      loadAttendees();
    } catch (error) {
      console.error('Error saving attendee', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteAttendee(id);
      loadAttendees();
    } catch (error) {
      console.error('Error deleting attendee', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ my: 3 }}>
        Attendee Management
      </Typography>
      <Button variant="contained" color="primary" onClick={() => setOpenDialog(true)}>
        Add Attendee
      </Button>
      <Grid container spacing={3} sx={{ my: 3 }}>
        {attendees.map((attendee) => (
          <Grid item xs={12} sm={6} md={4} key={attendee.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{attendee.firstName} {attendee.lastName}</Typography>
                <Typography variant="body2" color="textSecondary" sx={{ my: 1 }}>
                  Email: {attendee.email}
                </Typography>
                <Typography variant="body2">Phone: {attendee.phone}</Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary" onClick={() => { setCurrentAttendee(attendee); setOpenDialog(true); }}>
                  Edit
                </Button>
                <Button size="small" color="secondary" onClick={() => handleDelete(attendee.id)}>
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>{currentAttendee.id ? 'Edit Attendee' : 'Add Attendee'}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="dense"
            label="First Name"
            name="firstName"
            value={currentAttendee.firstName}
            onChange={(e) => setCurrentAttendee({ ...currentAttendee, firstName: e.target.value })}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Last Name"
            name="lastName"
            value={currentAttendee.lastName}
            onChange={(e) => setCurrentAttendee({ ...currentAttendee, lastName: e.target.value })}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Email"
            name="email"
            value={currentAttendee.email}
            onChange={(e) => setCurrentAttendee({ ...currentAttendee, email: e.target.value })}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Phone"
            name="phone"
            value={currentAttendee.phone}
            onChange={(e) => setCurrentAttendee({ ...currentAttendee, phone: e.target.value })}
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

export default AttendeeManagement;


// import React, { useState, useEffect } from 'react';
// import {
//     getAttendees,
//     createAttendee,
//     updateAttendee,
//     deleteAttendee,
//     assignEventToAttendee,
//     getEvents,
// } from '../services/api';
// import {
//     Container,
//     Typography,
//     Button,
//     Grid,
//     Card,
//     CardContent,
//     CardActions,
//     Dialog,
//     DialogActions,
//     DialogContent,
//     DialogTitle,
//     TextField,
//     Select,
//     MenuItem,
//     FormControl,
//     InputLabel,
// } from '@mui/material';

// const AttendeeManagement = () => {
//     const [attendees, setAttendees] = useState([]);
//     const [events, setEvents] = useState([]);
//     const [openDialog, setOpenDialog] = useState(false);
//     const [currentAttendee, setCurrentAttendee] = useState({
//         name: '',
//         email: '',
//         phone: '',
//         eventId: '',
//     });

//     useEffect(() => {
//         fetchAttendees();
//         fetchEvents();
//     }, []);

//     const fetchAttendees = async () => {
//         const data = await getAttendees();
//         setAttendees(data);
//     };

//     const fetchEvents = async () => {
//         const data = await getEvents();
//         setEvents(data);
//     };

//     const handleSave = async () => {
//         if (currentAttendee.id) {
//             await updateAttendee(currentAttendee.id, currentAttendee);
//         } else {
//             await createAttendee(currentAttendee);
//         }
//         fetchAttendees();
//         setOpenDialog(false);
//     };

//     const handleDelete = async (id) => {
//         await deleteAttendee(id);
//         fetchAttendees();
//     };

//     const handleAssignEvent = async (attendeeId, eventId) => {
//         await assignEventToAttendee(attendeeId, eventId);
//         fetchAttendees();
//     };

//     return (
//         <Container>
//             <Typography variant="h4" sx={{ my: 3 }}>
//                 Attendee Management
//             </Typography>
//             <Button
//                 variant="contained"
//                 color="primary"
//                 onClick={() => {
//                     setCurrentAttendee({ name: '', email: '', phone: '', eventId: '' });
//                     setOpenDialog(true);
//                 }}
//             >
//                 Add Attendee
//             </Button>
//             <Grid container spacing={3} sx={{ mt: 3 }}>
//                 {attendees.map((attendee) => (
//                     <Grid item xs={12} sm={6} md={4} key={attendee.id}>
//                         <Card>
//                             <CardContent>
//                                 <Typography variant="h6">{attendee.name}</Typography>
//                                 <Typography>Email: {attendee.email}</Typography>
//                                 <Typography>Phone: {attendee.phone}</Typography>
//                                 <Typography>
//                                     Event:{' '}
//                                     {attendee.event ? `${attendee.event.name} - ${attendee.event.description}` : 'Not Assigned'}
//                                     </Typography>
//                             </CardContent>
//                             <CardActions>
//                                 <Button
//                                     size="small"
//                                     color="primary"
//                                     onClick={() => {
//                                         setCurrentAttendee({
//                                             id: attendee.id,
//                                             name: attendee.name,
//                                             email: attendee.email,
//                                             phone: attendee.phone,
//                                             eventId: attendee.event?.id || '',
//                                         });
//                                         setOpenDialog(true);
//                                     }}
//                                 >
//                                     Edit
//                                 </Button>
//                                 <Button
//                                     size="small"
//                                     color="secondary"
//                                     onClick={() => handleDelete(attendee.id)}
//                                 >
//                                     Delete
//                                 </Button>
//                                 <FormControl sx={{ ml: 1 }}>
//                                     <Select
//                                         value={attendee.event?.id || ''}
//                                         onChange={(e) =>
//                                             handleAssignEvent(attendee.id, e.target.value)
//                                         }
//                                         displayEmpty
//                                     >
//                                         <MenuItem value="" disabled>
//                                             Assign Event
//                                         </MenuItem>
//                                         {events.map((event) => (
//                                             <MenuItem key={event.id} value={event.id}>
//                                                 {event.name}
//                                             </MenuItem>
//                                         ))}
//                                     </Select>
//                                 </FormControl>
//                             </CardActions>
//                         </Card>
//                     </Grid>
//                 ))}
//             </Grid>

//             <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
//                 <DialogTitle>
//                     {currentAttendee.id ? 'Edit Attendee' : 'Add Attendee'}
//                 </DialogTitle>
//                 <DialogContent>
//                     <TextField
//                         fullWidth
//                         label="Name"
//                         margin="dense"
//                         value={currentAttendee.name}
//                         onChange={(e) =>
//                             setCurrentAttendee({ ...currentAttendee, name: e.target.value })
//                         }
//                     />
//                     <TextField
//                         fullWidth
//                         label="Email"
//                         margin="dense"
//                         value={currentAttendee.email}
//                         onChange={(e) =>
//                             setCurrentAttendee({ ...currentAttendee, email: e.target.value })
//                         }
//                     />
//                     <TextField
//                         fullWidth
//                         label="Phone"
//                         margin="dense"
//                         value={currentAttendee.phone}
//                         onChange={(e) =>
//                             setCurrentAttendee({ ...currentAttendee, phone: e.target.value })
//                         }
//                     />
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={() => setOpenDialog(false)} color="secondary">
//                         Cancel
//                     </Button>
//                     <Button onClick={handleSave} color="primary">
//                         Save
//                     </Button>
//                 </DialogActions>
//             </Dialog>
//         </Container>
//     );
// };

// export default AttendeeManagement;


