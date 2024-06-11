package com.backend.meetvent.domain;

import com.backend.meetvent.domain.views.Views;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonView;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;

@Entity
public class UserInterestCounter extends BaseEntity{
    @JsonIgnore
    @ManyToOne
    private AppUser appUser;
    @JsonView(Views.Public.class)
    private int interestKey;
    @JsonView(Views.Public.class)
    private int counterEvents;

    public AppUser getAppUser() {
        return appUser;
    }

    public void setAppUser(AppUser appUser) {
        this.appUser = appUser;
    }

    public int getInterestKey() {
        return interestKey;
    }

    public void setInterestKey(int interestKey) {
        this.interestKey = interestKey;
    }

    public int getCounterEvents() {
        return counterEvents;
    }

    public void setCounterEvents(int counterEvents) {
        this.counterEvents = counterEvents;
    }
}
