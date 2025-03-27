package ma.norsys.pocscheduler.controller.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class InvoiceRequestDto {

    @NotBlank
    private String month;

    @NotBlank
    private String year;

    @NotBlank
    private Long client;
}
