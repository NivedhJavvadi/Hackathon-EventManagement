package in.nivedh.services;




import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import in.nivedh.entity.Attendee;
import in.nivedh.entity.Event;
import in.nivedh.repository.AttendeeRepository;
import in.nivedh.repository.EventRepository;

@Service
public class EventService {

    @Autowired
    
    private EventRepository eventRepository;
    
    private AttendeeRepository attendeeRepository;

    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    public Event createEvent(Event event) {
        return eventRepository.save(event);
    }

    public Event updateEvent(Long id, Event event) {
        Event existingEvent = eventRepository.findById(id).orElseThrow();
        existingEvent.setName(event.getName());
        existingEvent.setDescription(event.getDescription());
        existingEvent.setLocation(event.getLocation());
        existingEvent.setDate(event.getDate());
        return eventRepository.save(existingEvent);
    }
    public Event findById(Long eventId) {
        return eventRepository.findById(eventId).orElse(null); // Return null if event not found
    }

    public void deleteEvent(Long id) {
        eventRepository.deleteById(id);
    }
}

//    public void assignEvent(Long attendeeId, Long eventId) {
//        Attendee attendee = attendeeRepository.findById(attendeeId)
//                .orElseThrow(() -> new RuntimeException("Attendee not found"));
//        Event event = eventRepository.findById(eventId)
//                .orElseThrow(() -> new RuntimeException("Event not found"));
//
//        attendee.setEvent(event);
//        attendeeRepository.save(attendee);
//    }}


