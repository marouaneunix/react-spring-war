package ma.norsys.pocscheduler.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import ma.norsys.pocscheduler.repository.Task;
import ma.norsys.pocscheduler.repository.TaskRepository;
import ma.norsys.pocscheduler.repository.TaskStatus;
import ma.norsys.pocscheduler.runnable.BatchRunnable;
import org.springframework.scheduling.TaskScheduler;
import org.springframework.scheduling.support.CronTrigger;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import javax.transaction.Transactional;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ScheduledFuture;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class SchedulerService {

    private final TaskRepository taskRepository;
    private final TaskScheduler taskScheduler;
    private final BatchService batchService;

    Map<Long, ScheduledFuture<?>> plannedTasks = new HashMap<>();

    @PostConstruct
    public void scheduleTasks() {
        log.info("Starting task scheduling");
        //TODO: To be approved example : (search for enabled and canceled tasks)
        List<Task> tasks = taskRepository.findAll();
        tasks.stream()
                .filter(task -> List.of(TaskStatus.ENABLE, TaskStatus.WAITING).contains(task.getStatus()))
                .forEach(this::schedule);
    }

    public void schedule(Task task) {
        log.info("Scheduling task {} - {}", task.getId(), task.getName());
        TaskStatus taskStatus = TaskStatus.ENABLE;
        try {
            plannedTasks.put(task.getId(), this.taskScheduler.schedule(new BatchRunnable(batchService, task), new CronTrigger(task.getCron())));
        }catch (IllegalArgumentException exception) {
            log.error(
                    "Loading task failed {}, invalid Cron expression {}",
                    task.getId(),
                    task.getCron());
            taskStatus = TaskStatus.ERROR;
        }
        task.setStatus(taskStatus);
        taskRepository.save(task);
    }

    public void scheduleTask(Task task) {
        ScheduledFuture<?> scheduledFuture = this.plannedTasks.get(task.getId());
        if(scheduledFuture != null) {
            scheduledFuture.cancel(true);
        }
        schedule(task);
    }

    public void cancelTask(Task task) {
        log.info("Cancelling task {}", task.getId());
        ScheduledFuture<?> scheduledFuture = this.plannedTasks.get(task.getId());
        scheduledFuture.cancel(true);
        task.setStatus(TaskStatus.CANCEL);
        taskRepository.save(task);
    }
}
