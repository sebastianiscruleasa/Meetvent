package com.backend.meetvent.service.auth;

import com.backend.meetvent.domain.AppUser;
import com.backend.meetvent.domain.dto.JSONMessageResponse;
import com.backend.meetvent.domain.dto.appUsers.AppUserConverter;
import com.backend.meetvent.domain.dto.appUsers.AppUserDTO;
import com.backend.meetvent.jwt.JwtUtils;
import com.backend.meetvent.repository.AppUserRepository;
import com.backend.meetvent.service.appUser.AppUserService;
import jakarta.transaction.Transactional;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthServiceImpl implements AuthService{
    private AppUserRepository appUserRepository;
    private AppUserService appUserService;
    private PasswordEncoder passwordEncoder;
    private AuthenticationManager authenticationManager;
    private JwtUtils jwtUtils;
    private AppUserConverter appUserConverter;

    public AuthServiceImpl(AppUserRepository appUserRepository, AppUserService appUserService, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager, JwtUtils jwtUtils, AppUserConverter appUserConverter) {
        this.appUserRepository = appUserRepository;
        this.appUserService = appUserService;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtUtils = jwtUtils;
        this.appUserConverter = appUserConverter;
    }

    @Override
    @Transactional
    public AppUserDTO signIn(String email, String password) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(email, password));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwtToken = jwtUtils.generateJwtToken(authentication);
        Optional<AppUser> appUser = this.appUserService.getAppUserByEmail(email);
        appUser.ifPresent(user -> user.setToken(jwtToken));
        AppUser updatedUser = this.appUserRepository.save(appUser.get());
        return appUserConverter.convertToDTO(updatedUser);
    }

    @Override
    public JSONMessageResponse register(AppUser appUser) {
        if (appUserRepository.existsAppUserByUsername(appUser.getUsername())) {
            return new JSONMessageResponse("Error: Username is already taken!");
        }

        if (appUserRepository.existsAppUserByEmail(appUser.getEmail())) {
            return new JSONMessageResponse("Error: Email is already in use!");
        }

        // Create new user's account
        appUser.setPassword(passwordEncoder.encode(appUser.getPassword()));
        appUserRepository.save(appUser);

        return new JSONMessageResponse("User registered successfully!");
    }
}
