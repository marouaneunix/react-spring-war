package ma.norsys.pocscheduler.runnable;

import lombok.RequiredArgsConstructor;
import ma.norsys.pocscheduler.repository.Task;
import ma.norsys.pocscheduler.service.BatchService;

@RequiredArgsConstructor
public class BatchRunnable implements Runnable{

    private final BatchService batchService;
    private final Task task;

    @Override
    public void run() {
        this.batchService.runBatch(this.task);
    }
}
