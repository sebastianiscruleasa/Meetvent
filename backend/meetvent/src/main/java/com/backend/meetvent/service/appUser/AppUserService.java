package com.backend.meetvent.service.appUser;

import com.backend.meetvent.domain.AppUser;
import com.backend.meetvent.domain.Event;
import com.backend.meetvent.domain.dto.appUsers.AppUserDTO;
import com.backend.meetvent.domain.dto.appUsers.AppUserVO;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

public interface AppUserService {
    Optional<AppUser> getAppUserByEmail(String email);
    AppUser getAppUserById(String id);
    List<Event> getUserEventsFromToken(String token);
    AppUser getUserFromToken(String token);
    AppUser updateUserProfile(String token, MultipartFile image) throws IOException;
    byte[] getProfileImage(String id);
    List<AppUser> getAppUsersWithIdsInList(List<Long> ids);
    List<AppUser> getAppUsersWithIdsNotInList(List<Long> ids);
    List<AppUserDTO> convertToAppUserDTOs(List<AppUser> appUsers);
    List<AppUserVO> convertToAppUserVos(List<AppUser> appUsers);
}
