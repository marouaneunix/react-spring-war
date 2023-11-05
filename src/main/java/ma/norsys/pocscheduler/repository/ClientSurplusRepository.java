package ma.norsys.pocscheduler.repository;

import ma.norsys.pocscheduler.domain.Client;
import ma.norsys.pocscheduler.domain.ClientSurplus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ClientSurplusRepository extends JpaRepository<ClientSurplus, Long> {

    @Query("SELECT cs FROM ClientSurplus cs where cs.client = :client")
    List<ClientSurplus> findByClient(@Param("client") Client client);

}
