package ma.norsys.pocscheduler.service;


import lombok.RequiredArgsConstructor;
import ma.norsys.pocscheduler.controller.TaskDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TaskService {


    public List<TaskDto> findAll() {
        return List.of(new TaskDto("nom", "cron"));
    }
}
