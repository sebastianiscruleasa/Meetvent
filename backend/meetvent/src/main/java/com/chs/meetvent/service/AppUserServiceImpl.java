package com.chs.meetvent.service;

import com.chs.meetvent.domain.AppUser;
import com.chs.meetvent.domain.Event;
import com.chs.meetvent.repository.AppUserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AppUserServiceImpl implements AppUserService{

    private AppUserRepository appUserRepository;

    public AppUserServiceImpl(AppUserRepository appUserRepository) {
        this.appUserRepository = appUserRepository;
    }

    @Override
    public Optional<AppUser> getAppUserByEmail(String email) {
        return appUserRepository.findAppUserByEmail(email);
    }

    @Override
    public List<Event> getUserEvents(String email) {
        Optional<AppUser> appUser = this.appUserRepository.findAppUserByEmail(email);
        return appUser.get().getEvents();
    }
}