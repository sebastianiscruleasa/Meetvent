package com.chs.meetvent.domain;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
public class Event extends BaseEntity{
    @ManyToMany
    @JoinTable(name = "event_user",
            joinColumns = @JoinColumn(name = "event_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id"))
    private List<AppUser> appUserList = new ArrayList<>();

    public List<AppUser> getAppUserList() {
        return appUserList;
    }

    public void setAppUserList(List<AppUser> appUserList) {
        this.appUserList = appUserList;
    }
}
