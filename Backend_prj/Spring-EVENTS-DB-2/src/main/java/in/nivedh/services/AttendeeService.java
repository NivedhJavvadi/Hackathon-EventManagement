package in.nivedh.services;

import java.util.List; 
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import in.nivedh.entity.*;

import in.nivedh.entity.Attendee;
import in.nivedh.repository.AttendeeRepository;
import in.nivedh.repository.EventRepository;


@Service
public class AttendeeService {

    @Autowired
    
    private AttendeeRepository attendeeRepository;

    private EventRepository eventRepository;

    public List<Attendee> getAllAttendees() {
        return attendeeRepository.findAll();
    }

    public Optional<Attendee> getAttendeeById(Long id) {
        return attendeeRepository.findById(id);
    }

    public Attendee createAttendee(Attendee attendee) {
        return attendeeRepository.save(attendee);
    }

    public Attendee updateAttendee(Long id, Attendee attendeeDetails) {
        Attendee attendee = attendeeRepository.findById(id).orElseThrow();
        attendee.setFirstName(attendeeDetails.getFirstName());
        attendee.setLastName(attendeeDetails.getLastName());
        attendee.setEmail(attendeeDetails.getEmail());
        attendee.setPhone(attendeeDetails.getPhone());
        return attendeeRepository.save(attendee);
    }

    public void deleteAttendee(Long id) {
        Attendee attendee = attendeeRepository.findById(id).orElseThrow();
        attendeeRepository.delete(attendee);
    }
    
//    public Attendee assignEventToAttendee(Long attendeeId, Long eventId) {
//        Attendee attendee = attendeeRepository.findById(attendeeId)
//                .orElseThrow(() -> new IllegalArgumentException("Attendee not found with id: " + attendeeId));
//        Event event = eventRepository.findById(eventId)
//                .orElseThrow(() -> new IllegalArgumentException("Event not found with id: " + eventId));
//        attendee.setEvent(event);
//        return attendeeRepository.save(attendee);
//    }
}

