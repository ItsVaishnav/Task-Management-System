package org.management.backend.controller;

import org.management.backend.entity.Task;
import org.management.backend.repository.TaskRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "http://localhost:5173")
public class TaskController {
    private final TaskRepository taskRepository;

    public TaskController(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
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

    @PostMapping
    public Task createTask(@RequestBody Task task) {
        return taskRepository.save(task);
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
