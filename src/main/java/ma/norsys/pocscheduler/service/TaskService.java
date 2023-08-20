package ma.norsys.pocscheduler.service;


import lombok.RequiredArgsConstructor;
import ma.norsys.pocscheduler.controller.TaskDto;
import ma.norsys.pocscheduler.repository.Task;
import ma.norsys.pocscheduler.repository.TaskRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;

    public List<TaskDto> findAll() {
        return taskRepository.findAll().stream().map(task -> new TaskDto(task.getName(), "")).collect(Collectors.toList());
    }

    public void saveTask() {
        Task task = new Task();
        task.setName("My task");
        taskRepository.save(task);
    }
}
