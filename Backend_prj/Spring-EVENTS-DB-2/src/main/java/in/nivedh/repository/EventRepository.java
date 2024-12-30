package in.nivedh.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import in.nivedh.entity.Event;

public interface EventRepository extends JpaRepository<Event, Long> {

}
