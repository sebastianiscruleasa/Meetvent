package com.chs.meetvent.controllers;

import com.chs.meetvent.domain.AppUser;
import com.chs.meetvent.domain.dto.AuthTokenDTO;
import com.chs.meetvent.domain.dto.JSONMessageResponse;
import com.chs.meetvent.domain.views.Views;
import com.chs.meetvent.jwt.JwtUtils;
import com.chs.meetvent.repository.AppUserRepository;
import com.chs.meetvent.service.AppUserService;
import com.fasterxml.jackson.annotation.JsonView;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private AppUserRepository appUserRepository;
    private AppUserService appUserService;
    private PasswordEncoder passwordEncoder;
    private AuthenticationManager authenticationManager;
    private JwtUtils jwtUtils;

    public AuthController(AppUserRepository appUserRepository, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager, JwtUtils jwtUtils, AppUserService appUserService) {
        this.appUserRepository = appUserRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtUtils = jwtUtils;
        this.appUserService = appUserService;
    }

    @PostMapping("/signin")
    @JsonView(Views.Internal.class)
    public ResponseEntity<?> authenticateUser(@RequestBody AppUser loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);
        Optional<AppUser> appUser = this.appUserService.getAppUserByEmail(loginRequest.getEmail());
        appUser.get().setToken(jwt);
        return ResponseEntity.ok(this.appUserRepository.save(appUser.get()));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody AppUser appUser) {
        if (appUserRepository.existsAppUserByUsername(appUser.getUsername())) {
            return ResponseEntity
                    .badRequest()
                    .body(new JSONMessageResponse("Error: Username is already taken!"));
        }

        if (appUserRepository.existsAppUserByEmail(appUser.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(new JSONMessageResponse("Error: Email is already in use!"));
        }

        // Create new user's account
        appUser.setPassword(passwordEncoder.encode(appUser.getPassword()));
        appUserRepository.save(appUser);

        return ResponseEntity.ok(new JSONMessageResponse("User registered successfully!"));
    }

}
