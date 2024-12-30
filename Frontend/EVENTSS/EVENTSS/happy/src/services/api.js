import axios from 'axios';

const API_URL = 'http://localhost:8080/api';


// export const getEvents = async () => {
//     try {
//       const response = await axios.get(`${API_URL}/events`);
//       return Array.isArray(response.data) ? response.data : [];
//     } catch (error) {
//       console.error('Error fetching events:', error);
//       return [];
//     }
//   };
export const getEvents = async () => {
  return axios.get(`${API_URL}/events`);
};

export const createEvent = async (event) => {
  return axios.post(`${API_URL}/events`, event);
};

export const updateEvent = async (id, event) => {
  return axios.put(`${API_URL}/events/${id}`, event);
};

export const deleteEvent = async (id) => {
  return axios.delete(`${API_URL}/events/${id}`);
};
//====================================

export const getAttendees = async () => {
  try {
    const response = await axios.get(`${API_URL}/attendees`);
    return response.data;
  } catch (error) {
    console.error('Error fetching attendees:', error);
    throw error;
  }
};

export const getAttendeeById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/attendees/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching attendee with ID ${id}:`, error);
    throw error;
  }
};

export const createAttendee = async (attendee) => {
  try {
    const response = await axios.post(`${API_URL}/attendees`, attendee);
    return response.data;
  } catch (error) {
    console.error('Error creating attendee:', error);
    throw error;
  }
};

export const updateAttendee = async (id, attendee) => {
  try {
    const response = await axios.put(`${API_URL}/attendees/${id}`, attendee);
    return response.data;
  } catch (error) {
    console.error(`Error updating attendee with ID ${id}:`, error);
    throw error;
  }
};

export const deleteAttendee = async (id) => {
  try {
    await axios.delete(`${API_URL}/attendees/${id}`);
  } catch (error) {
    console.error(`Error deleting attendee with ID ${id}:`, error);
    throw error;
  }
};

//====================================



// Fetch all tasks

export const getTasks = async () => {
  try {
    const response = await axios.get(`${API_URL}/tasks`);
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return [];
  }
};

export const createTask = async (task) => {
  try {
    const response = await axios.post(`${API_URL}/tasks`, task);
    return response.data;
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
};

export const updateTask = async (id, task) => {
  try {
    const response = await axios.put(`${API_URL}/tasks/${id}`, task);
    return response.data;
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
};

export const deleteTask = async (id) => {
  try {
    await axios.delete(`${API_URL}/tasks/${id}`);
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
};

// Assign Event to Attendee API
// export const assignEventToAttendee = async (attendeeId, eventId) => {
//     try {
//       const response = await axios.post(`${API_URL}/attendees/${attendeeId}/assign-event/${eventId}`);
//       return response.data;
//     } catch (error) {
//       console.error('Error assigning event to attendee:', error);
//       throw error;
//     }
//   };
  
  // Event API
 
// export const getTasks = async () => {
//   try {
//     const response = await axios.get(`${API_URL}/tasks`);
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching tasks:', error);
//     throw error;
//   }
// };

// // Create a new task
// export const createTask = async (task) => {
//   try {
//     const response = await axios.post(`${API_URL}/tasks`, task);
//     return response.data;
//   } catch (error) {
//     console.error('Error creating task:', error);
//     throw error;
//   }
// };

// // Update an existing task
// export const updateTask = async (id, task) => {
//   try {
//     const response = await axios.put(`${API_URL}/tasks/${id}`, task);
//     return response.data;
//   } catch (error) {
//     console.error('Error updating task:', error);
//     throw error;
//   }
// };

// // Delete a task
// export const deleteTask = async (id) => {
//   try {
//     await axios.delete(`${API_URL}/tasks/${id}`);
//   } catch (error) {
//     console.error('Error deleting task:', error);
//     throw error;
//   }
// };