package com.chs.meetvent.controllers;

import com.chs.meetvent.constants.SecurityConstants;
import com.chs.meetvent.domain.AppUser;
import com.chs.meetvent.domain.Event;
import com.chs.meetvent.jwt.JwtUtils;
import com.chs.meetvent.service.AppUserService;
import com.chs.meetvent.service.EventService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/events")
public class EventController {
    private EventService eventService;
    private AppUserService appUserService;
    private JwtUtils jwtUtils;

    public EventController(EventService eventService,
                           JwtUtils jwtUtils,
                           AppUserService appUserService) {
        this.eventService = eventService;
        this.jwtUtils = jwtUtils;
        this.appUserService = appUserService;
    }

    @GetMapping()
    public List<Event> getAllEvents() {
        return this.eventService.getAllEvents();
    }

    @GetMapping("{id}")
    public Optional<Event> getEventById(@PathVariable String id) {
        return this.eventService.getEventById(id);
    }

    @PostMapping()
    public void saveEvent(@RequestBody Event event, @RequestHeader(SecurityConstants.JWT_HEADER) String token) {
        String email = jwtUtils.getUserNameFromJwtToken(token.substring(7));
        Optional<AppUser> appUser = this.appUserService.getAppUserByEmail(email);
        event.setOrganizer(appUser.get());
        this.eventService.saveEvent(event);
    }

    @DeleteMapping("{id}")
    public void deleteEventById(@PathVariable Long id) {
        this.eventService.deleteEventById(id);
    }
}
