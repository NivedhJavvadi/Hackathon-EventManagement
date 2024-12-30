package in.nivedh.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import in.nivedh.entity.Task;

public interface TaskRepository extends JpaRepository<Task, Long> {

}
