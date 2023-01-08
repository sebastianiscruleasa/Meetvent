package com.chs.meetvent.service;

import com.chs.meetvent.domain.AppUser;
import com.chs.meetvent.domain.Event;

import java.util.List;
import java.util.Optional;

public interface EventService {
    List<Event> getAllEvents();
    Optional<Event> getEventById(String id);
    Event saveEvent(Event event);
    void deleteEventById(Long id);
    List<AppUser> getUserForEvents(String id);
}
