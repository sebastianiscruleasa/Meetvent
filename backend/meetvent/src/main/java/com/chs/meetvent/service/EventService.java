package com.chs.meetvent.service;

import com.chs.meetvent.domain.AppUser;
import com.chs.meetvent.domain.Event;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

public interface EventService {
    List<Event> getAllEvents();
    Event getEventById(String id);
    Event saveEvent(Event event);
    void deleteEventById(Long id);
    List<AppUser> getUserForEvents(String id);
    List<Event> getEventsFromCity(String city);
    void updateEventImage(String id, MultipartFile image) throws IOException;
    Event createEvent(Event event, String token);
}
