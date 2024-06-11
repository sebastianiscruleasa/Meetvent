package com.backend.meetvent.service.appUser;

import com.backend.meetvent.domain.dto.appUsers.AppUserDTO;
import com.backend.meetvent.domain.dto.appUsers.AppUserVO;
import com.backend.meetvent.repository.AppUserRepository;
import com.backend.meetvent.domain.AppUser;
import com.backend.meetvent.domain.Event;
import com.backend.meetvent.jwt.JwtUtils;
import com.backend.meetvent.service.ImageUtils;
import com.backend.meetvent.service.UserInterestCounterService;
import org.hibernate.Hibernate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class AppUserServiceImpl implements AppUserService{
    private AppUserRepository appUserRepository;
    private UserInterestCounterService userInterestCounterService;
    private JwtUtils jwtUtils;

    public AppUserServiceImpl(AppUserRepository appUserRepository,
                              JwtUtils jwtUtils,
                              UserInterestCounterService userInterestCounterService) {
        this.appUserRepository = appUserRepository;
        this.jwtUtils = jwtUtils;
        this.userInterestCounterService = userInterestCounterService;
    }

    @Override
    public Optional<AppUser> getAppUserByEmail(String email) {
        return appUserRepository.findAppUserByEmail(email);
    }

    @Override
    @Transactional
    public List<Event> getUserEventsFromToken(String token) {
        AppUser appUser = this.getUserFromToken(token);
        List<Event> events = appUser.getEvents();
        Hibernate.initialize(events);
        return events;
    }

    @Override
    public AppUser getUserFromToken(String token) {
        String email = jwtUtils.getUserNameFromJwtToken(token.substring(7));
        Optional<AppUser> appUser = this.getAppUserByEmail(email);
        return appUser.get();
    }

    @Override
    public AppUser updateUserProfile(String token, MultipartFile image) throws IOException{
        AppUser appUser = this.getUserFromToken(token);
        appUser.setImage(ImageUtils.compressImage(image.getBytes()));
        return this.appUserRepository.save(appUser);
    }

    @Override
    public byte[] getProfileImage(String id) {
        AppUser appUser = this.getAppUserById(id);
        byte[] image = ImageUtils.decompressImage(appUser.getImage());
        return image;
    }

    @Override
    public List<AppUser> getAppUsersWithIdsInList(List<Long> ids) {
        return this.appUserRepository.findAllByIdIn(ids);
    }

    @Override
    public List<AppUser> getAppUsersWithIdsNotInList(List<Long> ids) {
        return this.appUserRepository.findAllByIdNotIn(ids);
    }

    @Override
    public AppUser getAppUserById(String id) {
        return this.appUserRepository.getAppUserById(Long.parseLong(id)).get();
    }

    @Override
    public List<AppUserDTO> convertToAppUserDTOs(List<AppUser> appUsers) {
        List<AppUserDTO> appUserDTOS = new ArrayList<>();
        for(AppUser appUser:appUsers) {
            appUserDTOS.add(new AppUserDTO(appUser));
        }
        return appUserDTOS;
    }

    @Override
    public List<AppUserVO> convertToAppUserVos(List<AppUser> appUsers) {
        List<AppUserVO> appUserVOS = new ArrayList<>();
        for(AppUser appUser:appUsers) {
            appUserVOS.add(new AppUserVO(appUser));
        }
        return appUserVOS;
    }
}
