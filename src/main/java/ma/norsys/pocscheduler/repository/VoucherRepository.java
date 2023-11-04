package ma.washmenara.pocscheduler.repository;

import ma.washmenara.pocscheduler.domain.Voucher;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VoucherRepository extends JpaRepository<Voucher, Long> {
}
