package ma.norsys.pocscheduler.service;


import lombok.RequiredArgsConstructor;
import ma.norsys.pocscheduler.controller.TaskDto;
import ma.norsys.pocscheduler.domain.Voucher;
import ma.norsys.pocscheduler.repository.VoucherRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final VoucherRepository taskRepository;

    public List<TaskDto> findAll() {
        return taskRepository.findAll().stream().map(task -> new TaskDto(task.getName(), "")).collect(Collectors.toList());
    }

    public void saveTask() {
        Voucher task = new Voucher();
        task.setName("My task");
        taskRepository.save(task);
    }
}
