package ma.norsys.pocscheduler.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import ma.norsys.pocscheduler.repository.Task;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class BatchService{

    private final JdbcTemplate jdbcTemplate;
    public void runBatch(Task task) {
        /**
         * code
         */
        jdbcTemplate.query("select * from dwh",rs -> {
            log.info("dwh id {}, name {}",rs.getLong("id"),rs.getString("name"));
        });
        log.info("Running batch of task {}",task.getName());
    }
}
