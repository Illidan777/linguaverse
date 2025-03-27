package com.gorbasenko245.linguaverse_backend;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.core.Ordered;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@SpringBootApplication
@EnableJpaRepositories("com.gorbasenko245.linguaverse_backend.repository")
@EntityScan("com.gorbasenko245.linguaverse_backend.domain.entity")
public class LinguaverseBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(LinguaverseBackendApplication.class, args);
	}

	private static final String WILDCARD = "*";
	private static final String COMMA = ",";

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

//	@Bean
//	public CorsFilter corsFilter() {
//		CorsConfiguration config = new CorsConfiguration();
//		config.setAllowCredentials(allowedCredentials);
//		config.setMaxAge(maxAge);
//		config.setAllowedOrigins(this.parseAndGetConfig(allowedOrigins));
//		config.setAllowedHeaders(this.parseAndGetConfig(allowedHeaders));
//		config.setAllowedMethods(this.parseAndGetConfig(allowedMethods));
//
//		final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//		source.registerCorsConfiguration(registerPath, config);
//
//		return new CorsFilter(source);
//	}

	private List<String> parseAndGetConfig(final String config) {
		final List<String> allowedOriginList;
		if (config.equals(WILDCARD)) {
			allowedOriginList = Collections.singletonList(WILDCARD);
		} else {
			allowedOriginList = Arrays.asList(config.split(COMMA));
		}
		return allowedOriginList;
	}

	@Bean
	public CorsFilter corsFilter() {
		CorsConfiguration config = new CorsConfiguration();
		config.setAllowCredentials(true);
		config.setAllowedOrigins(List.of("http://localhost:3000"));
		config.setAllowedMethods(List.of("POST", "PUT", "PATCH", "GET", "OPTIONS", "DELETE"));

		config.setAllowedHeaders(List.of(
				"Authorization",
				"Accept",
				"X-Requested-With",
				"Content-Type",
				"Access-Control-Request-Method",
				"Access-Control-Request-Headers"));

		config.setExposedHeaders(List.of(
				"Access-Control-Allow-Origin",
				"Access-Control-Allow-Credentials"));

		config.setMaxAge(3600L);

		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", config);

		return new CorsFilter(source);
	}
}
