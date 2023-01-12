package com.chs.meetvent.service;

import com.chs.meetvent.api_error.exceptions.UserAlreadyJoinedEventException;
import com.chs.meetvent.domain.AppUser;
import com.chs.meetvent.domain.Event;
import com.chs.meetvent.domain.UserInterestCounter;
import com.chs.meetvent.repository.EventRepository;
import jakarta.persistence.EntityNotFoundException;
import org.hibernate.Hibernate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.IIOException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class EventServiceImpl implements EventService{

    private EventRepository eventRepository;
    private AppUserService appUserService;
    private UserInterestCounterService userInterestCounterService;

    public EventServiceImpl(EventRepository eventRepository,
                            AppUserService appUserService,
                            UserInterestCounterService userInterestCounterService) {
        this.eventRepository = eventRepository;
        this.appUserService = appUserService;
        this.userInterestCounterService = userInterestCounterService;
    }

    @Override
    @Transactional
    public List<Event> getAllEvents(String token) {
        AppUser appUser = this.appUserService.getUserFromToken(token);
        for(Event e:this.eventRepository.findAll()) {
            if(appUser.getEvents().contains(e)) {
                e.setGoing(true);
            } else {
                e.setGoing(false);
            }
            this.eventRepository.save(e);
        }
        return this.eventRepository.findAll();
    }

    @Override
    public Event getEventById(String id) {
        Optional<Event> eventOptional = this.eventRepository.findById(Long.parseLong(id));
        if(eventOptional.isEmpty()) {
            throw new EntityNotFoundException("Nu exista eveniment cu id-ul " + id);
        }
        Event event = eventOptional.get();
        return event;
    }

    @Transactional
    @Override
    public Event saveEvent(Event event) {
        return this.eventRepository.save(event);
    }

    @Override
    public void deleteEventById(Long id) {
        this.eventRepository.deleteById(id);
    }

    @Override
    @Transactional
    public List<AppUser> getUserForEvents(String id) {
        Optional<Event> event = this.eventRepository.findById(Long.parseLong(id));
        List<AppUser> attendees = event.get().getAttendees();
        Hibernate.initialize(attendees);
        return attendees;
    }

    @Transactional
    public List<Event> getEventsFromCity(String cityName) {
        return this.eventRepository.findAllByAddress_City(cityName);
    }

    @Override
    public Event updateEventImage(String id, MultipartFile image) throws IOException {
        Event event = this.getEventById(id);
        event.setImage(ImageUtils.compressImage(image.getBytes()));
        return event;
    }

    @Override
    public Event createEvent(Event event, String token) {
        event.setOrganizer(this.appUserService.getUserFromToken(token));
        Event savedEvent  = this.saveEvent(event);
        return savedEvent;
    }

    @Override
    @Transactional
    public List<UserInterestCounter> joinEvent(String userToken, String eventId) {
        AppUser appUser = this.appUserService.getUserFromToken(userToken);
        Event event = this.getEventById(eventId);
        UserInterestCounter userInterestCounter;
        if(appUser.getEvents().contains(event)) {
            throw new UserAlreadyJoinedEventException("User already joined this event");
        } else {
            appUser.saveEvent(event);
            this.eventRepository.save(event);
            try {
                userInterestCounter = this.userInterestCounterService.updateUserInterestCounter(event.getInterestKey(), appUser);
            } catch (NoSuchElementException e) {
                userInterestCounter = this.userInterestCounterService.saveNewElement(event.getInterestKey(), appUser);
            }
        }
        List<UserInterestCounter> userInterests = this.userInterestCounterService.getAllInterestsForUser(appUser);
        return userInterests;
    }

    @Override
    public Event getEventByIdAndToken(String id, String userToken) {
        List<Event> events = this.appUserService.getUserEventsFromToken(userToken);
        Event event = this.getEventById(id);
        if(events.contains(event)) {
            event.setGoing(true);
        } else {
            event.setGoing(false);
        }
        this.eventRepository.save(event);
        return event;
    }

    @Override
    public byte[] getEventImage(String id) {
        Event event = this.getEventById(id);
        byte[] image = ImageUtils.decompressImage(event.getImage());
        return image;
    }
}
