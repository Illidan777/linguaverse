package com.gorbasenko245.linguaverse_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

/**
 * Main entry point for the Linguaverse Backend application.
 * <p>
 * This class is responsible for bootstrapping the Spring Boot application, setting up the Spring context,
 * and starting the embedded server.
 * </p>
 */
@SpringBootApplication
@EnableJpaRepositories("com.gorbasenko245.linguaverse_backend.repository")
@EntityScan("com.gorbasenko245.linguaverse_backend.domain.entity")
public class LinguaverseBackendApplication {

    /**
     * Main method to run the application.
     * <p>
     * This is the starting point of the Spring Boot application. It triggers the
     * Spring Boot application context to initialize, loads configuration properties,
     * and launches the embedded server.
     * </p>
     *
     * @param args command-line arguments passed to the application (optional)
     */
    public static void main(String[] args) {
        // Launch the Spring Boot application
        SpringApplication.run(LinguaverseBackendApplication.class, args);
    }
}
