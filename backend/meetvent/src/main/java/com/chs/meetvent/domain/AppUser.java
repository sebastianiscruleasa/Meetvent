package com.chs.meetvent.domain;
import com.chs.meetvent.domain.views.Views;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonView;
import jakarta.persistence.*;
import org.springframework.transaction.annotation.Transactional;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="users")
public class AppUser extends BaseEntity{
    @JsonView(Views.Public.class)
    private String email;
    @JsonView(Views.Public.class)
    private String username;
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;
    @JsonIgnore
    @Lob
    @Column(name="image", length = 1000)
    private byte[] image;
    @Lob
    private String description;
    @ManyToMany(mappedBy = "attendees")
    @JsonIgnore
    private List<Event> events = new ArrayList<>();
    @JsonView(Views.Internal.class)
    @OneToMany(mappedBy = "appUser", fetch = FetchType.EAGER)
    private List<UserInterestCounter> userInterestCounters = new ArrayList<>();
    @JsonView(Views.Internal.class)
    private URI imageUri;
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

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
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

    public List<UserInterestCounter> getUserInterestCounters() {
        return userInterestCounters;
    }

    public void setUserInterestCounters(List<UserInterestCounter> userInterestCounters) {
        this.userInterestCounters = userInterestCounters;
    }

    public URI getImageUri() {
        return imageUri;
    }

    public void setImageUri(URI imageUri) {
        this.imageUri = imageUri;
    }
}
