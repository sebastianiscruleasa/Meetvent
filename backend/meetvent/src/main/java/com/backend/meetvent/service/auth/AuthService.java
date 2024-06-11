package com.backend.meetvent.service.auth;

import com.backend.meetvent.domain.AppUser;
import com.backend.meetvent.domain.dto.JSONMessageResponse;
import com.backend.meetvent.domain.dto.appUsers.AppUserDTO;

public interface AuthService {
    AppUserDTO signIn(String email, String password);
    JSONMessageResponse register(AppUser appUser);
}
