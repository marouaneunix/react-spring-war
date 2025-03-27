package ma.norsys.pocscheduler.controller.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProductDetailsDto {

    private Integer productId;
    @NotBlank
    private List<QuantityByDayDto> quantityByDays;

}