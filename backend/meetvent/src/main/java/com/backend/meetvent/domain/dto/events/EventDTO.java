package com.backend.meetvent.domain.dto.events;

import com.backend.meetvent.domain.Address;
import com.backend.meetvent.domain.Event;
import com.backend.meetvent.domain.dto.appUsers.AppUserVO;

import java.net.URI;
import java.time.LocalDate;
import java.util.List;

public class EventDTO {
    private Long id;
    private String title;
    private AppUserVO organizer;
    private List<AppUserVO> attendees;
    private LocalDate date;
    private String time;
    private String location;
    private Address address;
    private int interestKey;
    private boolean going;
    private URI imageUri;

    public EventDTO(Event event) {
        this.id = event.getId();
        this.title = event.getTitle();
        this.organizer = new AppUserVO(event.getOrganizer());
        this.date = event.getDate();
        this.time = event.getTime();
        this.location = event.getLocation();
        this.address = event.getAddress();
        this.interestKey = event.getInterestKey();
        this.imageUri = event.getImageUri();
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public AppUserVO getOrganizer() {
        return organizer;
    }

    public List<AppUserVO> getAttendees() {
        return attendees;
    }

    public void setAttendees(List<AppUserVO> attendees) {
        this.attendees = attendees;
    }

    public LocalDate getDate() {
        return date;
    }

    public String getTime() {
        return time;
    }

    public String getLocation() {
        return location;
    }

    public Address getAddress() {
        return address;
    }

    public int getInterestKey() {
        return interestKey;
    }

    public boolean isGoing() {
        return going;
    }

    public void setGoing(boolean going) {
        this.going = going;
    }

    public URI getImageUri() {
        return imageUri;
    }
}
