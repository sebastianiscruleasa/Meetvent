package com.backend.meetvent.domain.dto.Chat;

import com.backend.meetvent.domain.AppUser;

import java.net.URI;

public class ContactUserVO {
    private final Long _id;
    private final String email;
    private final String name;
    private final URI avatar;

    public ContactUserVO(AppUser appUser) {
        this._id = appUser.getId();
        this.email = appUser.getEmail();
        this.name = appUser.getUsername();
        this.avatar = appUser.getImageUri();
    }

    public Long get_id() {
        return _id;
    }

    public String getEmail() {
        return email;
    }

    public String getName() {
        return name;
    }

    public URI getAvatar() {
        return avatar;
    }
}
