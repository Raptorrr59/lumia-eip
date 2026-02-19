package com.example.demo.security;

import com.example.demo.repository.UserTokensRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class JwtConfig {

    private final UserTokensRepository userTokensRepository;
    private final UserDetailsService userDetailsService;

    public JwtConfig(UserTokensRepository userTokensRepository,
                     UserDetailsService userDetailsService) {
        this.userTokensRepository = userTokensRepository;
        this.userDetailsService = userDetailsService;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors(Customizer.withDefaults())
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(authorizeRequests -> authorizeRequests
                        .requestMatchers("/api/login", "/api/newUser", "/api/confirmEmail", "/api/verify",
                                "/api/ranking/**", "/api/training/change-status", "/api/comments",
                                "/api/comments/*/with-replies", "/api/send-event-registration-email",
                                "/api/unregister-from-event", "/api/check-event-registration/**",
                                "/api/events/*/registrations/count", "/api/check-banned-email").permitAll()
                        .requestMatchers("/refresh-token").hasRole("USER")
                        .requestMatchers("/swagger-ui.html", "/swagger-ui/**", "/v3/api-docs/**").permitAll()
                        .requestMatchers("/ws/**").permitAll()
                        .requestMatchers("/api/game/stream",  "/api/game/upload").permitAll()
                        .anyRequest().authenticated()
                )
                .addFilterBefore(new JwtAuthorizationFilter(userTokensRepository, userDetailsService), UsernamePasswordAuthenticationFilter.class)
                .rememberMe(Customizer.withDefaults());
        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000", "http://localhost:8080"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}