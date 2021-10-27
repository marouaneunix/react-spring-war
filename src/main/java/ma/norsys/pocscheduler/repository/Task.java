package ma.norsys.pocscheduler.repository;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import ma.norsys.pocscheduler.controller.TaskController;
import ma.norsys.pocscheduler.controller.TaskDto;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String cron;
    @Enumerated(EnumType.STRING)
    private TaskStatus status;

    public Task(TaskDto taskDto) {
        this.name = taskDto.getNom();
        this.cron = taskDto.getCron();
    }
}
