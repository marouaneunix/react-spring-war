package ma.norsys.pocscheduler.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Invoice {

    @Id
    @GeneratedValue(strategy = GenerationType.TABLE)
    private Long id;

    private Date generatedAt;

    @Column(columnDefinition="text", length=10485760)
    private String details;

    @Column(columnDefinition="text", length=10485760)
    private String surplus;

    @Column(columnDefinition="text", length=10485760)
    private String prices;

    private String month;

    private String year;

    private String code;

    @ManyToOne
    private Client client;
}
