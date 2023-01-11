package com.chs.meetvent.service;

import com.chs.meetvent.domain.AppUser;
import com.chs.meetvent.domain.Event;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

public interface AppUserService {
    Optional<AppUser> getAppUserByEmail(String email);
    List<Event> getUserEventsFromToken(String token);
    AppUser getUserFromToken(String token);
    AppUser updateUserProfile(String token, MultipartFile image, String description) throws IOException;
    byte[] getProfileImage(String token);
}
