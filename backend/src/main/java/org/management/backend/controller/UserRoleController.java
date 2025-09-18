//package org.management.backend.controller;
//
//import org.management.backend.entity.Role;
//import org.management.backend.repository.UserRepository;
//import org.management.backend.repository.UserRoleRepository;
//import org.springframework.web.bind.annotation.CrossOrigin;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import java.util.List;
//
//@RestController
//@RequestMapping("/api/userRole")
//@CrossOrigin(origins = "http://localhost:5173")
//public class UserRoleController {
//    private final UserRoleRepository userRoleRepository;
//    public UserRoleController(UserRoleRepository userRoleRepository) {
//        this.userRoleRepository = userRoleRepository;
//    }
//    @GetMapping
//    public List<Role> findAll() {
//        return userRoleRepository.findAll();
//    }
//
//}
