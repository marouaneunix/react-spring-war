package ma.norsys.pocscheduler;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.TaskScheduler;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class PocschedulerApplication {

    public static void main(String[] args) {
        SpringApplication.run(PocschedulerApplication.class, args);
    }


}
