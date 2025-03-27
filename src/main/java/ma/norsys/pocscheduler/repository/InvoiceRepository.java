package ma.norsys.pocscheduler.repository;

import ma.norsys.pocscheduler.domain.Client;
import ma.norsys.pocscheduler.domain.Invoice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface InvoiceRepository extends JpaRepository<Invoice, Long> {

    @Query("SELECT v FROM Invoice v where v.client = :client and v.month = :month and v.year = :year")
    List<Invoice> findByClientAndMonthAndYear(@Param("client") Client client, @Param("month") String month, @Param("year") String year);

    @Query("SELECT v FROM Invoice v where v.year = :year")
    List<Invoice> findByYear(@Param("year") String year);


}
