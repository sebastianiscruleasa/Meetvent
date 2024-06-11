package com.backend.meetvent.controllers;

import com.backend.meetvent.constants.SecurityConstants;
import com.backend.meetvent.domain.Event;
import com.backend.meetvent.domain.dto.UserInterestCounter.UserInterestCounterDTO;
import com.backend.meetvent.domain.dto.appUsers.AppUserDTO;
import com.backend.meetvent.domain.dto.events.EventDTO;
import com.backend.meetvent.domain.views.Views;
import com.backend.meetvent.repository.EventRepository;
import com.backend.meetvent.service.events.EventService;
import com.fasterxml.jackson.annotation.JsonView;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/events")
public class EventController {
    private EventService eventService;
    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    @GetMapping()
    public List<EventDTO> getAllEvents(@RequestHeader(SecurityConstants.JWT_HEADER) String token) {
        return this.eventService.getAllEvents(token);
    }

    @GetMapping("/organizer")
    public List<EventDTO> getOrganizerEvents(@RequestHeader(SecurityConstants.JWT_HEADER) String token) {
        return this.eventService.getOrganizerEvents(token);
    }

    @GetMapping("{id}")
    public ResponseEntity<EventDTO> getEventById(@PathVariable String id, @RequestHeader(SecurityConstants.JWT_HEADER) String token) {
        return new ResponseEntity<>(this.eventService.getEventByIdAndToken(id, token), HttpStatus.OK);
    }

    @PostMapping()
    public ResponseEntity<EventDTO> saveEvent(@RequestBody Event event, @RequestHeader(SecurityConstants.JWT_HEADER) String token) {
        EventDTO savedEvent = this.eventService.createEvent(event, token);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(savedEvent.getId()).toUri();
        return ResponseEntity.created(location).body(savedEvent);
    }

    @DeleteMapping("{id}")
    public void deleteEventById(@PathVariable Long id) {
        this.eventService.deleteEventById(id);
    }

    @GetMapping("/{id}/users")
    public List<AppUserDTO> getUsersForEvent(@PathVariable String id) {
        return this.eventService.getUserForEvents(id);
    }

    @GetMapping("city/{name}")
    public List<EventDTO> getEventsFromCity(@PathVariable String name, @RequestHeader(SecurityConstants.JWT_HEADER) String token) {
        return this.eventService.getEventsFromCity(name, token);
    }

    @GetMapping("trending/city/{name}")
    public List<EventDTO> getTrendingEventsFromCity(@PathVariable String name, @RequestHeader(SecurityConstants.JWT_HEADER) String token) {
        return this.eventService.getTrendingEventsFromCity(name, token);
    }

    @PostMapping(path="/{id}/image", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
    public ResponseEntity<EventDTO> updateEventImage(@PathVariable String id, @ModelAttribute MultipartFile image) throws IOException {
        URI location = ServletUriComponentsBuilder.fromCurrentRequest().buildAndExpand(id).toUri();
        EventDTO eventDTO = this.eventService.updateEventImage(id, image, location);
        return new ResponseEntity<>(eventDTO, HttpStatus.OK);
    }

    @GetMapping(path="/{id}/image")
    public ResponseEntity<?> getImage(@PathVariable String id) {
        byte[] image = this.eventService.getEventImage(id);
        return ResponseEntity.status(HttpStatus.OK).contentType(MediaType.valueOf("image/png")).body(image);
    }

    @PostMapping("/{id}/join") //join an Event as a User
    @JsonView(Views.Public.class)
    public List<UserInterestCounterDTO> joinEvent(@RequestHeader(SecurityConstants.JWT_HEADER) String token, @PathVariable String id) {
        return this.eventService.joinEvent(token, id);
    }


}
