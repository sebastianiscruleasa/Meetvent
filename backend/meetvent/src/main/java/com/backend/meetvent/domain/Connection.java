package com.backend.meetvent.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "connections")
public class Connection extends BaseEntity{
    @ManyToOne
    private AppUser appUser1;
    @ManyToOne
    private AppUser appUser2;
    private String user1Response;
    private String user2Response;

    public AppUser getAppUser1() {
        return appUser1;
    }

    public void setAppUser1(AppUser appUser1) {
        this.appUser1 = appUser1;
    }

    public AppUser getAppUser2() {
        return appUser2;
    }

    public void setAppUser2(AppUser appUser2) {
        this.appUser2 = appUser2;
    }

    public String isUser1Response() {
        return user1Response;
    }

    public void setUser1Response(String user1Response) {
        this.user1Response = user1Response;
    }

    public String isUser2Response() {
        return user2Response;
    }

    public void setUser2Response(String user2Response) {
        this.user2Response = user2Response;
    }
}
