package ma.norsys.pocscheduler.controller;

import lombok.RequiredArgsConstructor;
import ma.norsys.pocscheduler.service.TaskService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@RequiredArgsConstructor
public class TaskController {

    private final TaskService taskService;

    @GetMapping
    public List<TaskDto> findAll() {
        return taskService.findAll();
    }

    @PostMapping
    public void saveTask(@RequestBody TaskDto taskDto){
        taskService.saveTask();
    }


}
