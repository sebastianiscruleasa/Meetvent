package com.chs.meetvent.controllers;

import com.chs.meetvent.domain.AppUser;
import com.chs.meetvent.domain.dto.AuthTokenDTO;
import com.chs.meetvent.domain.dto.TestDTO;
import com.chs.meetvent.jwt.JwtUtils;
import com.chs.meetvent.repository.AppUserRepository;
import com.chs.meetvent.service.UserDetailsImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private AppUserRepository appUserRepository;
    private PasswordEncoder passwordEncoder;
    private AuthenticationManager authenticationManager;
    private JwtUtils jwtUtils;

    public AuthController(AppUserRepository appUserRepository, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager, JwtUtils jwtUtils) {
        this.appUserRepository = appUserRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtUtils = jwtUtils;
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody AppUser appUser) {
        AppUser savedAppUser = null;
        ResponseEntity response = null;
        try {
            String hashPassword = passwordEncoder.encode(appUser.getPassword());
            appUser.setPassword(hashPassword);
            savedAppUser = appUserRepository.save(appUser);
            if (savedAppUser.getId() > 0) {
                response = ResponseEntity
                        .status(HttpStatus.CREATED)
                        .body("Given user details are successfully registered");
            }
        } catch (Exception ex) {
            response = ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An exception occured due to " + ex.getMessage());
        }
        return response;
    }

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@RequestBody AppUser loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        return ResponseEntity.ok(new AuthTokenDTO(jwt));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser2(@RequestBody AppUser appUser) {
        if (appUserRepository.existsAppUserByUsername(appUser.getUsername())) {
            return ResponseEntity
                    .badRequest()
                    .body("Error: Username is already taken!");
        }

        if (appUserRepository.existsAppUserByEmail(appUser.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body("Error: Email is already in use!");
        }

        // Create new user's account
        appUser.setPassword(passwordEncoder.encode(appUser.getPassword()));
        appUserRepository.save(appUser);

        return ResponseEntity.ok(new AuthTokenDTO("User registered successfully!"));
    }

    @GetMapping("/test")
    public TestDTO testController() {
        return new TestDTO("test");
    }

}
