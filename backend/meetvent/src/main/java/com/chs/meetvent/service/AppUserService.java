package com.chs.meetvent.service;

import com.chs.meetvent.domain.AppUser;
import com.chs.meetvent.domain.Event;

import java.util.List;
import java.util.Optional;

public interface AppUserService {
    Optional<AppUser> getAppUserByEmail(String email);

    List<Event> getUserEvents(String email);
}
