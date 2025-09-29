package org.management.backend.controller;

import org.management.backend.entity.User;
import org.management.backend.repository.UserRepository;
import org.management.backend.repository.UserRoleRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")

public class UserController {
    private final UserRepository userRepository;
    private final UserRoleRepository userRoleRepository;
    public UserController(UserRepository userRepository, UserRoleRepository userRoleRepository) {
        this.userRepository = userRepository;
        this.userRoleRepository = userRoleRepository;
    }

    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @PostMapping
    public User createUser(@RequestBody User user) {
        return userRepository.save(user);
    }

//    @PutMapping("/{id}")
//    public User updateUser(@PathVariable Long id, @RequestBody User userDetails) {
//        User user = userRepository.findById(id).orElseThrow();
//        user.setName(userDetails.getName());
//        user.setEmail(userDetails.getEmail());
//        user.setPassword(userDetails.getPassword());
//        System.out.println(userDetails);
//        return userRepository.save(user);
//    }

    @PutMapping("/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody User userDetails) {
        User user = userRepository.findById(id).orElseThrow();
        user.setName(userDetails.getName());
        user.setEmail(userDetails.getEmail());
        user.setPassword(userDetails.getPassword());
        return userRepository.save(user);
    }


    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        userRepository.deleteById(id);
    }
}
