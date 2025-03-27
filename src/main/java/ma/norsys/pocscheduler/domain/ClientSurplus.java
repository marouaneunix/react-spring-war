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
public class ClientSurplus {

    @Id
    @GeneratedValue(strategy = GenerationType.TABLE)
    private Long id;

    private Date generatedAt;

    private String details;

    @ManyToOne
    private Client client;
}
