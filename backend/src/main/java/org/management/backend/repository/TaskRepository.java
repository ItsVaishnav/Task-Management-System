package org.management.backend.repository;

import org.management.backend.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByStatusId(Long statusId);
    List<Task> findByAssigneeId(Long assigneeId);
    List<Task> findByStatusIdAndAssigneeId(Long statusId, Long assigneeId);
}
