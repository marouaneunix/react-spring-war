package ma.norsys.pocscheduler.configuration;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.core.env.Environment;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.JdbcTransactionManager;
import org.springframework.transaction.PlatformTransactionManager;

import javax.sql.DataSource;

@Configuration
@EnableJpaRepositories(
        basePackages = "ma.norsys.pocscheduler.dwh.repository",
        entityManagerFactoryRef = "dwhEntityManager",
        transactionManagerRef = "dwhTransactionManager"
)
public class PersistenceDwhConfiguration {

    @Bean
    @ConfigurationProperties(prefix = "spring.client-datasource")
    public DataSource dwhDataSource() {
        return DataSourceBuilder.create().build();
    }

    @Bean
    public JdbcTemplate jdbcTemplate() {
        return new JdbcTemplate(dwhDataSource());
    }
}
