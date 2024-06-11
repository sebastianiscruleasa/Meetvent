package com.backend.meetvent.domain.dto.appUsers;
import com.backend.meetvent.domain.AppUser;

import java.net.URI;

public class AppUserVO {
    private Long id;
    private String email;
    private String username;
    private URI imageUri;

    public AppUserVO(AppUser appUser) {
        this.id = appUser.getId();
        this.email = appUser.getEmail();
        this.username = appUser.getUsername();
        this.imageUri = appUser.getImageUri();
    }

    public Long getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public String getUsername() {
        return username;
    }

    public URI getImageUri() {
        return imageUri;
    }
}
