package ma.norsys.pocscheduler.controller.dto;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class InvoiceDto {

    private Long id;
    private List<ProductDetailsDto> productDetailsList;
    @NotBlank
    private String details;
    @NotBlank
    private String surplus;
    @NotBlank
    private String prices;
    @NotBlank
    private String month;
    @NotBlank
    private String year;
    @NotBlank
    private ClientDto client;

    private String code;

    private Date generatedAt;


    public InvoiceDto(Long id, String details, String prices, String surplus, String month, String year, String code, Date generatedAt, ClientDto clientDto) {
        this.setId(id);
        this.setDetails(details);
        this.setPrices(prices);
        this.setSurplus(surplus);
        this.setMonth(month);
        this.setClient(clientDto);
        this.setGeneratedAt(generatedAt);
        this.setYear(year);
        this.setCode(code);

    }
}
