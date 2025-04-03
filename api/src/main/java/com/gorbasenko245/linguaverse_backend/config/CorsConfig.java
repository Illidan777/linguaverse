package com.gorbasenko245.linguaverse_backend.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;


/**
 * Configuration class for setting up CORS (Cross-Origin Resource Sharing) settings in the application.
 * <p>
 * This configuration defines how the server responds to cross-origin requests, including which origins, methods,
 * headers are allowed, and whether credentials are allowed.
 * </p>
 */
@Configuration
public class CorsConfig {

    // Constant for wildcard origins
    private static final String WILDCARD = "*";
    private static final String COMMA = ",";

    // Values loaded from application.properties

    @Value("${cors.config.allowed.credentials}")
    private Boolean allowedCredentials;
    @Value("${cors.config.allowed.origin}")
    private String allowedOrigins;
    @Value("${cors.config.allowed.method}")
    private String allowedMethods;
    @Value("${cors.config.allowed.header}")
    private String allowedHeaders;
    @Value("${cors.config.max-age}")
    private Long maxAge;
    @Value("${cors.config.register.path}")
    private String registerPath;

    /**
     * Bean that defines the CORS filter configuration.
     * <p>
     * This filter is used to intercept incoming requests and apply CORS settings based on the configured values.
     * </p>
     *
     * @return the configured CORS filter
     */
	@Bean
	public CorsFilter corsFilter() {
        // Create a new CorsConfiguration instance
		CorsConfiguration config = new CorsConfiguration();

        // Set up the CORS configuration using loaded properties
		config.setAllowCredentials(allowedCredentials);
		config.setMaxAge(maxAge);
		config.setAllowedOrigins(this.parseAndGetConfig(allowedOrigins));
		config.setAllowedHeaders(this.parseAndGetConfig(allowedHeaders));
		config.setAllowedMethods(this.parseAndGetConfig(allowedMethods));

        // Register the CORS configuration for a specific path
		final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration(registerPath, config);

        // Return the configured CORS filter
		return new CorsFilter(source);
	}

    /**
     * Helper method to parse and get the CORS configuration.
     * <p>
     * This method processes the configuration strings (e.g., comma-separated list of allowed origins)
     * and returns them as a list of strings. If the configuration is a wildcard, a single element list
     * with "*" is returned.
     * </p>
     *
     * @param config the comma-separated configuration string (or wildcard)
     * @return the list of parsed configurations
     */
    private List<String> parseAndGetConfig(final String config) {
        final List<String> allowedOriginList;

        // If the config is a wildcard, return a list with "*"
        if (config.equals(WILDCARD)) {
            allowedOriginList = Collections.singletonList(WILDCARD);
        } else {
            // Otherwise, split the config by commas and return a list
            allowedOriginList = Arrays.asList(config.split(COMMA));
        }
        return allowedOriginList;
    }
}
