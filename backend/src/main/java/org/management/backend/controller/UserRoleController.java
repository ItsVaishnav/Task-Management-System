package org.management.backend.controller;

import org.management.backend.entity.Role;
import org.management.backend.entity.UserRole;
import org.management.backend.repository.RoleRepository;
import org.management.backend.repository.UserRepository;
import org.management.backend.repository.UserRoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/userRoles")
@CrossOrigin(origins = "http://localhost:3000")
public class UserRoleController{

    @Autowired
    private UserRoleRepository userRoleRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    // Get all userRoles
    @GetMapping
    public List<UserRole> getAllUserRoles() {
        return userRoleRepository.findAll();
    }

    // Get roles for a specific user
    @GetMapping("/user/{userId}")
    public List<UserRole> getRolesByUser(@PathVariable Long userId) {
        return userRoleRepository.findByUserId(userId); // ✅ Returns UserRole list
    }

    @PutMapping("/{id}")
    public UserRole updateUserRole(@PathVariable Long id, @RequestBody UserRole updatedUserRole) {
        Optional<UserRole> optionalUserRole = userRoleRepository.findById(id);
        System.out.println( optionalUserRole);
        if (!optionalUserRole.isPresent()) {
            throw new RuntimeException("UserRole not found with id " + id);
        }

        UserRole userRole = optionalUserRole.get();

        // Update Role name if provided
        if (updatedUserRole.getRole() != null && updatedUserRole.getRole().getRollName() != null) {
            Role role = userRole.getRole();
            role.setRollName(updatedUserRole.getRole().getRollName());
            roleRepository.save(role); // save updated role
        }

        return userRoleRepository.save(userRole);
    }

    // Assign role to user
    @PostMapping
    public UserRole assignRoleToUser(@RequestBody UserRole userRole) {
        if (userRole.getUser() != null && userRole.getUser().getId() != null) {
            userRole.setUser(userRepository.findById(userRole.getUser().getId())
                    .orElseThrow(() -> new RuntimeException("User not found")));
        }
        if (userRole.getRole() != null && userRole.getRole().getR_id() != null) {
            userRole.setRole(roleRepository.findById(userRole.getRole().getR_id())
                    .orElseThrow(() -> new RuntimeException("Role not found")));
        }
        return userRoleRepository.save(userRole);
    }

    // Delete userRole
    @DeleteMapping("/{id}")
    public void deleteUserRole(@PathVariable Long id) {
        userRoleRepository.deleteById(id);
    }
}
