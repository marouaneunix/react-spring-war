package ma.norsys.pocscheduler.repository;

import ma.norsys.pocscheduler.domain.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
