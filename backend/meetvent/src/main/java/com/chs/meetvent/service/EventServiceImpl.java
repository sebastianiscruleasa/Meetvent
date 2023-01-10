package com.chs.meetvent.service;

import com.chs.meetvent.domain.AppUser;
import com.chs.meetvent.domain.Event;
import com.chs.meetvent.repository.EventRepository;
import org.hibernate.Hibernate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class EventServiceImpl implements EventService{

    private EventRepository eventRepository;

    public EventServiceImpl(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    @Override
    public List<Event> getAllEvents() {
        return this.eventRepository.findAll();
    }

    @Override
    public Optional<Event> getEventById(String id) {
        return this.eventRepository.findById(Long.parseLong(id));
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

    public List<Event> getEventsFromCity(String cityName) {
        return this.eventRepository.findAllByAddress_City(cityName);
    }
}
