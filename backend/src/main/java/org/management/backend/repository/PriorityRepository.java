package org.management.backend.repository;

import org.management.backend.entity.Priority;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PriorityRepository extends JpaRepository<Priority,Long> {
}
