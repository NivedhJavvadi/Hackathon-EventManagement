package in.nivedh.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import in.nivedh.entity.AssignEventRequest;
import in.nivedh.entity.Attendee;
import in.nivedh.services.AttendeeService;


@RestController
@RequestMapping("/api/attendees")
@CrossOrigin(origins = "http://localhost:3001") // Allow CORS for frontend
public class AttendeeController {

    @Autowired
    private AttendeeService attendeeService;

    @GetMapping
    public List<Attendee> getAllAttendees() {
        return attendeeService.getAllAttendees();
    }

    @GetMapping("/{id}")
    public Optional<Attendee> getAttendeeById(@PathVariable Long id) {
        return attendeeService.getAttendeeById(id);
    }

    @PostMapping
    public Attendee createAttendee(@RequestBody Attendee attendee) {
        return attendeeService.createAttendee(attendee);
    }

    @PutMapping("/{id}")
    public Attendee updateAttendee(@PathVariable Long id, @RequestBody Attendee attendeeDetails) {
        return attendeeService.updateAttendee(id, attendeeDetails);
    }

    @DeleteMapping("/{id}")
    public void deleteAttendee(@PathVariable Long id) {
        attendeeService.deleteAttendee(id);
    }
//    @GetMapping("/test")
//    public String testEndpoint() {
//        return "Test endpoint working!";
//    }
//    @PutMapping("/{attendeeId}/assign")
//    public void assignEventToAttendee(@PathVariable Long attendeeId, @RequestBody AssignEventRequest request) {
//        attendeeService.assignEventToAttendee(attendeeId, request.getEventId());
//    }


}
