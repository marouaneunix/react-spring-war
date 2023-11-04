package ma.norsys.pocscheduler.repository;

import ma.norsys.pocscheduler.domain.Client;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClientRepository extends JpaRepository<Client, Long> {
}
