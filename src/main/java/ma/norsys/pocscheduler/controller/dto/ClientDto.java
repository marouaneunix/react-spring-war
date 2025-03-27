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

    private int nbrVoucher;

    @NotBlank
    private String ice;

    private Date archivedAt;

    public ClientDto(Long id, String name, String society, String ice, int nbrVoucher, Date archivedAt) {
        this.id = id;
        this.name = name;
        this.society = society;
        this.ice = ice;
        this.nbrVoucher = nbrVoucher;
        this.archivedAt = archivedAt;
    }
}
