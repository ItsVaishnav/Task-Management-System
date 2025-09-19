package org.management.backend.controller;

import org.management.backend.entity.Task;
import org.management.backend.entity.User;
import org.management.backend.repository.TaskRepository;
import org.management.backend.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "http://localhost:5173")
public class TaskController {
    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    public TaskController(TaskRepository taskRepository, UserRepository userRepository) {
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
    }

    // GET /api/tasks?status=1&assignee=2
    @GetMapping
    public List<Task> getTasks(
            @RequestParam(required = false) Long status,
            @RequestParam(required = false) Long assignee) {

        if (status != null && assignee != null) {
            return taskRepository.findByStatusIdAndAssigneeId(status, assignee);
        } else if (status != null) {
            return taskRepository.findByStatusId(status);
        } else if (assignee != null) {
            return taskRepository.findByAssigneeId(assignee);
        }
        return taskRepository.findAll();
    }

    // controller/TaskController.java
    @PostMapping("/tasks")
    public ResponseEntity<Task> createTask(@RequestBody TaskRequest taskRequest) {
        User assignee = userRepository.findById(Math.toIntExact(taskRequest.getAssigneeId()))
                .orElseThrow(() -> new RuntimeException("User not found with id " + taskRequest.getAssigneeId()));

        Task task = new Task();
        task.setTitle(taskRequest.getTitle());
        task.setStatus(taskRequest.getStatus());
        task.setPriority(taskRequest.getPriority());
        task.setAssignee(assignee);

        Task savedTask = taskRepository.save(task);
        return ResponseEntity.ok(savedTask);
    }


    @PutMapping("/{id}")
    public Task updateTask(@PathVariable Long id, @RequestBody Task taskDetails) {
        Task task = taskRepository.findById(id).orElseThrow();
        task.setTitle(taskDetails.getTitle());
        task.setDescription(taskDetails.getDescription());
        task.setStatus(taskDetails.getStatus());
        task.setPriority(taskDetails.getPriority());
        task.setAssignee(taskDetails.getAssignee());
        task.setUpdatedAt(taskDetails.getUpdatedAt());
        return taskRepository.save(task);
    }

    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable Long id) {
        taskRepository.deleteById(id);
    }
}
