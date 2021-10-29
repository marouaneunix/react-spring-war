package ma.norsys.pocscheduler.configuration;

import org.springframework.boot.autoconfigure.flyway.FlywayDataSource;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.core.env.Environment;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.PlatformTransactionManager;

import javax.sql.DataSource;
import java.util.HashMap;

@Configuration
@EnableJpaRepositories(
        basePackages = "ma.norsys.pocscheduler.repository",
        entityManagerFactoryRef = "pccEntityManager",
        transactionManagerRef = "pccTransactionManager"
)
public class PersistencePccConfiguration {

    private final Environment env;

    public PersistencePccConfiguration(Environment env) {
        this.env = env;
    }

    // TODO: two data source with one db ***
    @Primary
    @Bean
    @ConfigurationProperties(prefix = "spring.datasource")
    public DataSource pccDataSource() {
        return DataSourceBuilder.create().build();
    }

    @Bean
    public LocalContainerEntityManagerFactoryBean pccEntityManager() {
        LocalContainerEntityManagerFactoryBean em
                = new LocalContainerEntityManagerFactoryBean();
        em.setDataSource(pccDataSource());
        em.setPackagesToScan(
                new String[]{"ma.norsys.pocscheduler.repository"});

        HibernateJpaVendorAdapter vendorAdapter = new HibernateJpaVendorAdapter();
        em.setJpaVendorAdapter(vendorAdapter);
        HashMap<String, Object> properties = new HashMap<>();
        properties.put("hibernate.dialect", env.getProperty("hibernate.dialect"));
        em.setJpaPropertyMap(properties);

        return em;
    }

    @Bean
    public PlatformTransactionManager pccTransactionManager() {
        JpaTransactionManager transactionManager = new JpaTransactionManager();
        transactionManager.setEntityManagerFactory(pccEntityManager().getObject());
        return transactionManager;
    }

    @Bean
    @FlywayDataSource
    public DataSource flywayDataSource() {
        return pccDataSource();
    }
}
