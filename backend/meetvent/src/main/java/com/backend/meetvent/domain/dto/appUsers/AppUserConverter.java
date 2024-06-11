package com.backend.meetvent.domain.dto.appUsers;

import com.backend.meetvent.domain.AppUser;
import org.springframework.stereotype.Component;

@Component
public class AppUserConverter {
    public AppUserDTO convertToDTO(AppUser appUser) {
        AppUserDTO appUserDTO = new AppUserDTO(appUser);
        return appUserDTO;
    }

    public AppUser convertToEntity(AppUserDTO appUserDTO) {
        return null;
    }
}
