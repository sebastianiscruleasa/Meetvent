package com.chs.meetvent.controllers;
import com.chs.meetvent.constants.SecurityConstants;
import com.chs.meetvent.domain.AppUser;
import com.chs.meetvent.domain.Event;
import com.chs.meetvent.jwt.JwtUtils;
import com.chs.meetvent.repository.AppUserRepository;
import com.chs.meetvent.repository.EventRepository;
import com.chs.meetvent.service.AppUserService;
import com.chs.meetvent.service.EventService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/users")
public class UserController {
    AppUserService appUserService;
    AppUserRepository appUserRepository;
    EventService eventService;
    EventRepository eventRepository;
    JwtUtils jwtUtils;

    public UserController(AppUserService appUserService,
                          AppUserRepository appUserRepository,
                          JwtUtils jwtUtils,
                          EventService eventService,
                          EventRepository eventRepository) {
        this.appUserService = appUserService;
        this.jwtUtils = jwtUtils;
        this.eventService = eventService;
        this.eventRepository = eventRepository;
        this.appUserRepository = appUserRepository;
    }

    @GetMapping()
    public AppUser getUser(@RequestHeader(SecurityConstants.JWT_HEADER) String token) {
        String email = jwtUtils.getUserNameFromJwtToken(token.substring(7));
        Optional<AppUser> appUser = this.appUserService.getAppUserByEmail(email);
        return appUser.get();
    }

    @GetMapping("/events")
    public List<Event> getUserEvents(@RequestHeader(SecurityConstants.JWT_HEADER) String token) {
        String email = jwtUtils.getUserNameFromJwtToken(token.substring(7));
        return this.appUserService.getUserEvents(email);
    }

    @PostMapping("/events/{id}") //join an Event as a User
    public void joinEvent( @PathVariable String id, @RequestHeader(SecurityConstants.JWT_HEADER) String token) {
        String email = jwtUtils.getUserNameFromJwtToken(token.substring(7));
        Optional<AppUser> appUser = this.appUserService.getAppUserByEmail(email);
        Optional<Event> event = this.eventService.getEventById(id);
        appUser.get().saveEvent(event.get());
        this.appUserRepository.save(appUser.get());
    }

}
