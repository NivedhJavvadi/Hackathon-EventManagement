import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EventManagement from './Components/EventManagement';
// import EventManagement from './components/EventManagement'; // Adjust the path as per your project structure
//import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Components/Navbar';
import AttendeeManagement from './Components/AttendeeManagement';
 import TaskTracker from './Components/TaskTracker'


function App() {
  return (
    <Router>
      <Navbar /> 
      <div className="container mt-4">
        <Routes>
          <Route path="/events" element={<EventManagement />} />
           <Route path="/attendees" element={<AttendeeManagement />}/>
          <Route path="/tasks" element= {<TaskTracker />} /> 
        </Routes>
      </div>
    </Router>
  );
}
export default App;