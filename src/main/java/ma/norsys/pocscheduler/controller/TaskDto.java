package ma.norsys.pocscheduler.controller;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TaskDto {
    @NotBlank
    private String nom;
    @NotBlank
    private String cron;
}
