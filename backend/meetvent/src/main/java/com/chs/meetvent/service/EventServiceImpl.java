package com.chs.meetvent.service;

import com.chs.meetvent.domain.AppUser;
import com.chs.meetvent.domain.Event;
import com.chs.meetvent.repository.EventRepository;
import jakarta.persistence.EntityNotFoundException;
import org.hibernate.Hibernate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.IIOException;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class EventServiceImpl implements EventService{

    private EventRepository eventRepository;
    private AppUserService appUserService;

    public EventServiceImpl(EventRepository eventRepository,
                            AppUserService appUserService) {
        this.eventRepository = eventRepository;
        this.appUserService = appUserService;
    }

    @Override
    public List<Event> getAllEvents() {
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
    public void updateEventImage(String id, MultipartFile image) throws IOException {
        Event event = this.getEventById(id);
        event.setImage(ImageUtils.compressImage(image.getBytes()));
    }

    @Override
    public Event createEvent(Event event, String token) {
        event.setOrganizer(this.appUserService.getUserFromToken(token));
        Event savedEvent  = this.saveEvent(event);
        return savedEvent;
    }
}
