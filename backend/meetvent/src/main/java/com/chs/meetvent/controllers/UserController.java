package com.chs.meetvent.controllers;
import com.chs.meetvent.constants.SecurityConstants;
import com.chs.meetvent.domain.AppUser;
import com.chs.meetvent.domain.Event;
import com.chs.meetvent.jwt.JwtUtils;
import com.chs.meetvent.repository.AppUserRepository;
import com.chs.meetvent.service.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@RestController
@RequestMapping("/users")
public class UserController {
    private AppUserService appUserService;
    private AppUserRepository appUserRepository;
    private EventService eventService;
    private JwtUtils jwtUtils;
    private UserInterestCounterService userInterestCounterService;

    public UserController(AppUserService appUserService,
                          AppUserRepository appUserRepository,
                          JwtUtils jwtUtils,
                          EventService eventService,
                          UserInterestCounterService userInterestCounterService) {
        this.appUserService = appUserService;
        this.jwtUtils = jwtUtils;
        this.eventService = eventService;
        this.userInterestCounterService = userInterestCounterService;
        this.appUserRepository = appUserRepository;
    }

    @GetMapping()
    public AppUser getUser(@RequestHeader(SecurityConstants.JWT_HEADER) String token) {
        return this.appUserService.getUserFromToken(token);
    }

    @GetMapping("/events")
    public List<Event> getUserEvents(@RequestHeader(SecurityConstants.JWT_HEADER) String token) {
        return this.appUserService.getUserEventsFromToken(token);
    }

    @PostMapping("/events/{eventId}") //join an Event as a User
    public void joinEvent(@RequestHeader(SecurityConstants.JWT_HEADER) String token, @PathVariable String eventId) {
        AppUser appUser = this.appUserService.getUserFromToken(token);
        Event event = this.eventService.getEventById(eventId);
        try {
            this.userInterestCounterService.updateUserInterestCounter(event.getInterestKey(), appUser);
        } catch (NoSuchElementException e) {
            this.userInterestCounterService.saveNewElement(event.getInterestKey(), appUser);
        }
        appUser.saveEvent(event);
        this.appUserRepository.save(appUser);
    }

    @PutMapping(path="/update", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
    public ResponseEntity<AppUser> updateProfile(@RequestHeader(SecurityConstants.JWT_HEADER) String token, @ModelAttribute MultipartFile image, @RequestPart String description) throws IOException {
        AppUser user = this.appUserService.updateUserProfile(token, image, description);
        return new ResponseEntity<>(this.appUserRepository.save(user), HttpStatus.CREATED);
    }

    @GetMapping("/image")
    public ResponseEntity<?> getImage(@RequestHeader(SecurityConstants.JWT_HEADER) String token) {
        byte[] image = this.appUserService.getProfileImage(token);
        return ResponseEntity.status(HttpStatus.OK).contentType(MediaType.valueOf("image/png")).body(image);
    }

}
