package ma.norsys.pocscheduler.service;

import ma.norsys.pocscheduler.repository.Task;
import org.springframework.stereotype.Service;

@Service
public class BatchService{

    public void runBatch(Task task) {
        System.out.println("Running batch of task "+ task.getName());
    }
}
