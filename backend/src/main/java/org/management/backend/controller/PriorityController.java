package org.management.backend.controller;

import org.management.backend.entity.Priority;
import org.management.backend.repository.PriorityRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/priorities")
@CrossOrigin(origins = "http://localhost:5174")

public class PriorityController {
    private final PriorityRepository priorityRepository;

    public PriorityController(PriorityRepository priorityRepository) {
        this.priorityRepository = priorityRepository;
    }

    @GetMapping
    public List<Priority> getAllPriorities() {
        return priorityRepository.findAll();
    }

    @PostMapping
    public Priority createPriority(@RequestBody Priority priority) {
        return priorityRepository.save(priority);
    }

    @PutMapping("/{id}")
    public Priority updatePriority(@PathVariable Long id, @RequestBody Priority details) {
        Priority priority = priorityRepository.findById(id).orElseThrow();
        priority.setName(details.getName());
        return priorityRepository.save(priority);
    }

    @DeleteMapping("/{id}")
    public void deletePriority(@PathVariable Long id) {
        priorityRepository.deleteById(id);
    }
}
