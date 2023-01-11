package com.chs.meetvent.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class UserInterestCounter extends BaseEntity{
    @JsonIgnore
    @ManyToOne
    private AppUser appUser;
    private int interestKey;
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
