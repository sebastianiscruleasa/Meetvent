package com.backend.meetvent.config;

import com.backend.meetvent.jwt.AuthTokenFilter;
import com.backend.meetvent.service.auth.UserDetailsServiceImpl;
import com.backend.meetvent.jwt.AuthEntryPointJwt;
import com.backend.meetvent.jwt.JwtUtils;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import java.util.Collections;

@Configuration
@EnableMethodSecurity
public class WebSecurityConfig {
    private UserDetailsServiceImpl userDetailsServiceImpl;

    private AuthEntryPointJwt unauthorizedHandler;
    private JwtUtils jwtUtils;

    public WebSecurityConfig(UserDetailsServiceImpl userDetailsServiceImpl, AuthEntryPointJwt unauthorizedHandler, JwtUtils jwtUtils) {
        this.userDetailsServiceImpl = userDetailsServiceImpl;
        this.unauthorizedHandler = unauthorizedHandler;
        this.jwtUtils = jwtUtils;
    }

    @Bean
    public AuthTokenFilter authenticationJwtTokenFilter(JwtUtils jwtUtils, UserDetailsServiceImpl userDetailsService) {
        return new AuthTokenFilter(jwtUtils, userDetailsService);
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();

        authProvider.setUserDetailsService(userDetailsServiceImpl);
        authProvider.setPasswordEncoder(passwordEncoder());

        return authProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf().disable()
                .exceptionHandling().authenticationEntryPoint(unauthorizedHandler).and()
                .cors().configurationSource(new CorsConfigurationSource() {
                    @Override
                    public CorsConfiguration getCorsConfiguration(HttpServletRequest request) {
                        CorsConfiguration config = new CorsConfiguration();
                        config.setAllowedOrigins(Collections.singletonList("*"));
                        config.setAllowedMethods(Collections.singletonList("*"));
                        config.setAllowCredentials(true);
                        config.setAllowedHeaders(Collections.singletonList("*"));
                        config.setMaxAge(3600L);
                        return config;
                    }}).and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
                .addFilterBefore(new AuthTokenFilter(jwtUtils, userDetailsServiceImpl), BasicAuthenticationFilter.class)
                .authorizeHttpRequests()
                .requestMatchers("/users", "/events" ,"/events/{id}", "/events/{id}/join","/users/events",
                                "/events/{id}/users", "/events/city/{name}", "/events/trending/city/{name}","/users/update", "/tinder/users", "/tinder/response/user/{id}", "/users/image", "/tinder/conversations", "/private-messages/**", "/events/organizer").authenticated()
                .requestMatchers("/auth/**", "/users/image/{id}", "/events/{id}/image", "/app/chatroom", "/chatroom/public", "/ws/**", "/app/private-message", "/user/{id}/private").permitAll()
                .and().formLogin()
                .and().httpBasic();

        http.authenticationProvider(authenticationProvider());

        http.addFilterBefore(authenticationJwtTokenFilter(jwtUtils, userDetailsServiceImpl), UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
