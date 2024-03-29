package com.chs.meetvent.service;

import com.chs.meetvent.domain.AppUser;
import com.chs.meetvent.domain.Event;
import com.chs.meetvent.domain.UserInterestCounter;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

public interface EventService {
    List<Event> getAllEvents(String token);
    Event getEventById(String id);
    Event saveEvent(Event event);
    void deleteEventById(Long id);
    List<AppUser> getUserForEvents(String id);
    List<Event> getEventsFromCity(String city, String token);
    List<Event> getTrendingEventsFromCity(String city, String token);
    Event updateEventImage(String id, MultipartFile image) throws IOException;
    Event createEvent(Event event, String token);
    List<UserInterestCounter> joinEvent(String userToken, String eventId);
    Event getEventByIdAndToken(String id, String userToken);
    byte[] getEventImage(String id);
}
