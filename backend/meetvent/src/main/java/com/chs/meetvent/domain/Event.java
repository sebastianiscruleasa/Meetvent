package com.chs.meetvent.domain;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name="events")
public class Event extends BaseEntity{
    private String title;
    @ManyToOne
    @JoinColumn(name="organizer_id")
    private AppUser organizer;
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "event_user",
            joinColumns = @JoinColumn(name = "event_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id"))
    @JsonIgnore
    private List<AppUser> attendees = new ArrayList<>();
    private Date date;

    @Embedded
    private Address address;

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

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
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
}
