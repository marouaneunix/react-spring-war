package ma.norsys.pocscheduler.repository;

import ma.norsys.pocscheduler.domain.Voucher;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Voucher, Long> {
}
