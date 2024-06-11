package com.backend.meetvent.service.events;

import com.backend.meetvent.domain.Event;
import com.backend.meetvent.domain.dto.UserInterestCounter.UserInterestCounterDTO;
import com.backend.meetvent.domain.dto.appUsers.AppUserDTO;
import com.backend.meetvent.domain.dto.events.EventDTO;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URI;
import java.util.List;

public interface EventService {
    List<EventDTO> getAllEvents(String token);
    Event saveEvent(Event event);
    void deleteEventById(Long id);
    List<AppUserDTO> getUserForEvents(String id);
    List<EventDTO> getEventsFromCity(String city, String token);
    List<EventDTO> getTrendingEventsFromCity(String city, String token);
    EventDTO updateEventImage(String id, MultipartFile image, URI location) throws IOException;
    EventDTO createEvent(Event event, String token);
    List<UserInterestCounterDTO> joinEvent(String userToken, String eventId);
    EventDTO getEventByIdAndToken(String id, String userToken);
    List<EventDTO> getOrganizerEvents(String userToken);
    byte[] getEventImage(String id);
}
