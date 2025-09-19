package org.management.backend.controller;

import org.management.backend.entity.Priority;
import org.management.backend.entity.Status;
import org.management.backend.entity.Task;
import org.management.backend.entity.User;
import org.management.backend.repository.PriorityRepository;
import org.management.backend.repository.StatusRepository;
import org.management.backend.repository.TaskRepository;
import org.management.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "http://localhost:3000")
public class TaskController {

//    private final TaskRepository taskRepository;
    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private StatusRepository statusRepository;

    @Autowired
    private PriorityRepository priorityRepository;

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



//    @PostMapping
//    public Task createTask(@RequestBody Task task) {
//        // Re-attach managed entities before saving
//        if (task.getAssignee() != null && task.getAssignee().getId() != null) {
//            User assignee = userRepository.findById(task.getAssignee().getId())
//                    .orElseThrow(() -> new RuntimeException("Assignee not found"));
//            task.setAssignee(assignee); // <-- here
//        }
//
//        if (task.getCreator() != null && task.getCreator().getId() != null) {
//            User creator = userRepository.findById(task.getCreator().getId())
//                    .orElseThrow(() -> new RuntimeException("Creator not found"));
//            task.setCreator(creator); // <-- here
//        }
//
//        if (task.getStatus() != null && task.getStatus().getId() != null) {
//            Status status = statusRepository.findById(task.getStatus().getId())
//                    .orElseThrow(() -> new RuntimeException("Status not found"));
//            task.setStatus(status);
//        }
//
//        if (task.getPriority() != null && task.getPriority().getId() != null) {
//            Priority priority = priorityRepository.findById(task.getPriority().getId())
//                    .orElseThrow(() -> new RuntimeException("Priority not found"));
//            task.setPriority(priority);
//        }
//
//        return taskRepository.save(task);
//    }


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
