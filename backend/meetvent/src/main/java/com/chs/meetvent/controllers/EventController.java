package com.chs.meetvent.controllers;

import com.chs.meetvent.constants.SecurityConstants;
import com.chs.meetvent.domain.AppUser;
import com.chs.meetvent.domain.Event;
import com.chs.meetvent.domain.dto.JSONMessageResponse;
import com.chs.meetvent.jwt.JwtUtils;
import com.chs.meetvent.service.AppUserService;
import com.chs.meetvent.service.EventService;
import com.chs.meetvent.service.ImageUtils;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.net.URI;
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
        Optional<Event> event =  this.eventService.getEventById(id);
        System.out.println(event);
        if(event.isEmpty()) {
            throw new EntityNotFoundException("Nu exista eveniment cu id-ul " + id);
        }
        System.out.println(event);
        return event;
    }

    @PostMapping()
    public ResponseEntity<Event> saveEvent(@RequestBody Event event, @RequestHeader(SecurityConstants.JWT_HEADER) String token) {
        String email = jwtUtils.getUserNameFromJwtToken(token.substring(7));
        Optional<AppUser> appUser = this.appUserService.getAppUserByEmail(email);
        event.setOrganizer(appUser.get());
        Event savedEvent  = this.eventService.saveEvent(event);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(savedEvent.getId()).toUri();
        System.out.println(location);
        return ResponseEntity.created(location).body(savedEvent);
    }

    @DeleteMapping("{id}")
    public void deleteEventById(@PathVariable Long id) {
        this.eventService.deleteEventById(id);
    }

    @GetMapping("/{id}/users")
    public List<AppUser> getUsersForEvent(@PathVariable String id) {
        return this.eventService.getUserForEvents(id);
    }

    @GetMapping("city/{name}")
    public List<Event> getEventsFromCity(@PathVariable String name) {
        return this.eventService.getEventsFromCity(name);
    }

    @PostMapping(path="/{id}/image", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
    public ResponseEntity<?> updateProfile(@PathVariable String id, @ModelAttribute MultipartFile image) throws IOException {
        Optional<Event> event = this.eventService.getEventById(id);
        event.get().setImage(ImageUtils.compressImage(image.getBytes()));
        return ResponseEntity.status(HttpStatus.OK).body(new JSONMessageResponse("Added image to event with id="+id));
    }
}
