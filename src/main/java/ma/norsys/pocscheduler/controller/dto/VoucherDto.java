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
public class VoucherDto {

    private Long id;
    @NotBlank
    private String details;
    @NotBlank
    private Date day;
    @NotBlank
    private int month;
    @NotBlank
    private Long client;


}
