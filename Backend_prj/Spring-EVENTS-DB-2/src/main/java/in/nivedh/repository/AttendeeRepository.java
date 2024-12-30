package in.nivedh.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import in.nivedh.entity.Attendee;

public interface AttendeeRepository extends JpaRepository<Attendee, Long> {

}
