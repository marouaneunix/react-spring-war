package ma.norsys.pocscheduler.controller.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ClientDto {

    private Long id;

    @NotBlank
    private String name;

    private String society;

    @NotBlank
    private String ice;

    private Date archivedAt;
}
