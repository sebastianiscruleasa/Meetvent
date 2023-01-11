package com.chs.meetvent.domain;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="events")
public class Event extends BaseEntity{
    private String title;
    @ManyToOne
    @JoinColumn(name="organizer_id")
    private AppUser organizer;
    @ManyToMany()
    @JoinTable(name = "event_user",
            joinColumns = @JoinColumn(name = "event_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id"))
    @JsonIgnore
    private List<AppUser> attendees = new ArrayList<>();
    private LocalDate date;
    private String time;
    private String location;
    @Embedded
    private Address address;
    @JsonIgnore
    @Lob
    @Column(name="image", length = 1000)
    private byte[] image;

    @Column(nullable = false)
    private int interestKey;

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
}
