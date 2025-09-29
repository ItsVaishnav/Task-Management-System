package org.management.backend.controller;
import org.management.backend.entity.User;
import org.management.backend.entity.UserRole;
import org.management.backend.repository.UserRepository;
import org.management.backend.repository.UserRoleRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {
    private final UserRepository userRepository;
    private final UserRoleRepository userRoleRepository;

    public AuthController(UserRepository userRepository, UserRoleRepository userRoleRepository) {
        this.userRepository = userRepository;
        this.userRoleRepository = userRoleRepository;
    }

    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return userRepository.save(user); // in production: hash password
    }

@PostMapping("/login")
public ResponseEntity<?> login(@RequestBody User user) {
    Optional<User> dbUser = userRepository.findByEmail(user.getEmail());

    if (dbUser.isPresent() && dbUser.get().getPassword().equals(user.getPassword())) {
        // Fetch user roles
        List<UserRole> userRoles = userRoleRepository.findByUser_Id(dbUser.get().getId());

        // Extract role names
        List<String> roleNames = userRoles.stream()
                .map(userRole -> userRole.getRole().getRollName())
                .toList();

        // Prepare response map
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Login successful");
        response.put("name", dbUser.get().getName());
        response.put("email", dbUser.get().getEmail());
        response.put("roles", roleNames);

        return ResponseEntity.ok(response);
    }

    return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
            .body(Collections.singletonMap("message", "Invalid credentials"));
}

}
