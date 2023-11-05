package ma.norsys.pocscheduler.repository;

import ma.norsys.pocscheduler.domain.Client;
import ma.norsys.pocscheduler.domain.Voucher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface VoucherRepository extends JpaRepository<Voucher, Long> {


    @Query("SELECT v FROM Voucher v where v.client = :client and v.month = :month")
    List<Voucher> findByClientAndMonth(@Param("client") Client client, @Param("month") int month);

}
