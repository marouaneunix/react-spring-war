package ma.norsys.pocscheduler.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    @Modifying
    @Query("update Task t set t.status = :status where t.id = :taskId")
    void updateStatus(@Param("taskId") Long taskId, @Param("status") TaskStatus status);
}
