package org.management.backend.repository;

import org.management.backend.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    // JpaRepository already provides:
    // findAll(), findById(), save(), deleteById() etc.
}
