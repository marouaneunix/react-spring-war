package ma.norsys.pocscheduler.service;


import lombok.RequiredArgsConstructor;
import ma.norsys.pocscheduler.repository.Task;
import ma.norsys.pocscheduler.repository.TaskRepository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;
    private final SchedulerService schedulerService;

    public void save(Task task) {
        this.taskRepository.save(task);
        schedulerService.schedule(task);
    }

    public void enableTask(Long taskId) {
        Task task = this.taskRepository.findById(taskId).orElseThrow(() -> new IllegalArgumentException("Task not found"));
        this.schedulerService.scheduleTask(task);

    }

    public void cancelTask(Long taskId) {
        Task task = this.taskRepository.findById(taskId).orElseThrow(() -> new IllegalArgumentException("Task not found"));
        this.schedulerService.cancelTask(task);
    }

    public List<Task> findAll() {
        return this.taskRepository.findAll();
    }
}
