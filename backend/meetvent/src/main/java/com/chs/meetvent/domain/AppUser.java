package com.chs.meetvent.domain;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="users")
public class AppUser extends BaseEntity{
    private String email;
    private String username;
    private String password;
    @Lob
    private Byte[] image;
    @Lob
    private String description;
    @ManyToMany(mappedBy = "attendees", fetch = FetchType.EAGER)
    @JsonIgnore
    private List<Event> events = new ArrayList<>();

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Byte[] getImage() {
        return image;
    }

    public void setImage(Byte[] image) {
        this.image = image;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<Event> getEvents() {
        return events;
    }

    public void setEvents(List<Event> events) {
        this.events = events;
    }

    public void saveEvent(Event event) {
        event.getAttendees().add(this);
        this.getEvents().add(event);
    }
}
