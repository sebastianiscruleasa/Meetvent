package com.chs.meetvent.service;

import com.chs.meetvent.domain.AppUser;
import com.chs.meetvent.domain.Event;
import com.chs.meetvent.domain.UserInterestCounter;
import com.chs.meetvent.jwt.JwtUtils;
import com.chs.meetvent.repository.AppUserRepository;
import org.hibernate.Hibernate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@Transactional
public class AppUserServiceImpl implements AppUserService{
    private AppUserRepository appUserRepository;
    private  UserInterestCounterService userInterestCounterService;
    private JwtUtils jwtUtils;

    public AppUserServiceImpl(AppUserRepository appUserRepository,
                              JwtUtils jwtUtils,
                              UserInterestCounterService userInterestCounterService) {
        this.appUserRepository = appUserRepository;
        this.jwtUtils = jwtUtils;
        this.userInterestCounterService = userInterestCounterService;
    }

    @Override
    public Optional<AppUser> getAppUserByEmail(String email) {
        return appUserRepository.findAppUserByEmail(email);
    }

    @Override
    public List<Event> getUserEventsFromToken(String token) {
        AppUser appUser = this.getUserFromToken(token);
        List<Event> events = appUser.getEvents();
        Hibernate.initialize(events);
        return events;
    }

    @Override
    public AppUser getUserFromToken(String token) {
        String email = jwtUtils.getUserNameFromJwtToken(token.substring(7));
        Optional<AppUser> appUser = this.getAppUserByEmail(email);
        return appUser.get();
    }

    @Override
    public AppUser updateUserProfile(String token, MultipartFile image, String description) throws IOException{
        AppUser appUser = this.getUserFromToken(token);
        appUser.setImage(ImageUtils.compressImage(image.getBytes()));
        appUser.setDescription(description);
        return this.appUserRepository.save(appUser);
    }

    @Override
    public byte[] getProfileImage(String token) {
        String email = jwtUtils.getUserNameFromJwtToken(token.substring(7));
        AppUser appUser = this.getUserFromToken(token);
        byte[] image = ImageUtils.decompressImage(appUser.getImage());
        return image;
    }
}
