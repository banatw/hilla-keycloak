package com.example.application;

import com.example.application.data.Employee;
import com.example.application.data.EmployeeRepository;
import com.github.javafaker.Faker;
import com.vaadin.flow.component.page.AppShellConfigurator;
import com.vaadin.flow.theme.Theme;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

/**
 * The entry point of the Spring Boot application.
 *
 * Use the @PWA annotation make the application installable on phones, tablets
 * and some desktop browsers.
 *
 */
@SpringBootApplication
@Theme(value = "hilla-keycloak")
public class Application implements AppShellConfigurator {
    private final EmployeeRepository employeeRepository;

    Logger logger = LoggerFactory.getLogger(Application.class);
    

    public Application(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }


    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

    @Bean
    CommandLineRunner commandLineRunner() {
        return (x)->{
            logger.info("Init Data");
            
            for (int i = 0; i < 50; i++) {
                Employee employee = new Employee();
                employee.setName(Faker.instance().name().fullName());
                employee.setEmail(Faker.instance().internet().emailAddress());
                employee.setHtml("<ol><li>dsdsds</li><li>dsdsdsdds</li></ol>");
                employeeRepository.save(employee);
            }
            logger.info("End init Data");
        };
    }
}
