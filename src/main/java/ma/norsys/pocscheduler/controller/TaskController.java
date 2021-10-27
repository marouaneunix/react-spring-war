package ma.norsys.pocscheduler.controller;

import lombok.RequiredArgsConstructor;
import ma.norsys.pocscheduler.repository.Task;
import ma.norsys.pocscheduler.repository.TaskStatus;
import ma.norsys.pocscheduler.service.TaskService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/tasks")
@RequiredArgsConstructor
public class TaskController {


    private final TaskService taskService;

    @PostMapping
    public void save(TaskDto taskDto) {
        this.taskService.save(new Task(taskDto));
    }


    @PatchMapping("/{taskId}")
    public void scheduleTask(@PathVariable("taskId") Long taskId, @RequestParam("status") TaskStatus status) {
        if(TaskStatus.ENABLE.equals(status)) {
            this.taskService.enableTask(taskId);
        }else if(TaskStatus.CANCEL.equals(status)) {
            this.taskService.cancelTask(taskId);
        }
    }


}
