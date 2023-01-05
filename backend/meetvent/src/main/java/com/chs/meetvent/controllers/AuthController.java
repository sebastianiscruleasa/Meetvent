package com.chs.meetvent.controllers;

import com.chs.meetvent.domain.AppUser;
import com.chs.meetvent.repository.AppUserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private AppUserRepository appUserRepository;
    private PasswordEncoder passwordEncoder;

    public AuthController(AppUserRepository appUserRepository,
                          PasswordEncoder passwordEncoder) {
        this.appUserRepository = appUserRepository;
        this.passwordEncoder = passwordEncoder;
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

}
