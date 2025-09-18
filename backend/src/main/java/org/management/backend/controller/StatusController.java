package org.management.backend.controller;

import org.management.backend.entity.Status;
import org.management.backend.repository.StatusRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/statuses")
@CrossOrigin(origins = "http://localhost:5174")
public class StatusController {
    private final StatusRepository statusRepository;
    public StatusController(StatusRepository statusRepository) {
        this.statusRepository = statusRepository;
    }

    @GetMapping
    public List<Status> getAllStatuses() {
        return statusRepository.findAll();
    }

    @PostMapping
    public Status createStatus(@RequestBody Status status) {
        return statusRepository.save(status);
    }

    @PutMapping("/{id}")
    public Status updateStatus(@PathVariable Long id, @RequestBody Status details) {
        Status status = statusRepository.findById(id).orElseThrow();
        status.setName(details.getName());
        return statusRepository.save(status);
    }

    @DeleteMapping("/{id}")
    public void deleteStatus(@PathVariable Long id) {
        statusRepository.deleteById(id);
    }
}
