package org.management.backend.repository;

import org.management.backend.entity.Role;
import org.management.backend.entity.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface UserRoleRepository extends JpaRepository<UserRole, Long> {
    List<UserRole> findByUser_Id(Long userId);
    List<UserRole> findByUserId(Long userId);
}
