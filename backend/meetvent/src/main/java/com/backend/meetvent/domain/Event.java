package com.backend.meetvent.domain;
import com.backend.meetvent.domain.views.Views;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonView;
import jakarta.persistence.*;

import java.net.URI;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="events")
public class Event extends BaseEntity{
    @JsonView(Views.Public.class)
    private String title;
    @JsonView(Views.Public.class)
    @ManyToOne
    @JoinColumn(name="organizer_id")
    private AppUser organizer;
    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(name = "event_user",
            joinColumns = @JoinColumn(name = "event_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id"))
    @JsonIgnore
    private List<AppUser> attendees = new ArrayList<>();
    @JsonView(Views.Public.class)
    private LocalDate date;
    @JsonView(Views.Public.class)
    private String time;
    @JsonView(Views.Public.class)
    private String location;
    @JsonView(Views.Public.class)
    @Embedded
    private Address address;
    @JsonIgnore
    @Lob
    @Column(name="image", length = 1000)
    private byte[] image;

    @JsonView(Views.Public.class)
    @Column(nullable = false)
    private int interestKey;

    @JsonView(Views.Going.class)
    @Column(nullable = false)
    private boolean going;

    @JsonView(Views.Public.class)
    private URI imageUri;

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public AppUser getOrganizer() {
        return organizer;
    }

    public void setOrganizer(AppUser organizer) {
        this.organizer = organizer;
    }

    public List<AppUser> getAttendees() {
        return attendees;
    }

    public void setAttendees(List<AppUser> attendees) {
        this.attendees = attendees;
    }

    public void addAttendee(AppUser attendee) {
        this.attendees.add(attendee);
        attendee.getEvents().add(this);
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public int getInterestKey() {
        return interestKey;
    }

    public void setInterestKey(int interestKey) {
        this.interestKey = interestKey;
    }

    public boolean getGoing() {
        return going;
    }

    public void setGoing(boolean going) {
        this.going = going;
    }

    public URI getImageUri() {
        return imageUri;
    }

    public void setImageUri(URI imageUri) {
        this.imageUri = imageUri;
    }
}
