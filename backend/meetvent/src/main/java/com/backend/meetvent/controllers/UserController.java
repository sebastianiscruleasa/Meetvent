package com.backend.meetvent.controllers;
import com.backend.meetvent.constants.SecurityConstants;
import com.backend.meetvent.domain.AppUser;
import com.backend.meetvent.domain.Event;
import com.backend.meetvent.domain.dto.appUsers.AppUserDTO;
import com.backend.meetvent.domain.views.Views;
import com.backend.meetvent.repository.AppUserRepository;
import com.backend.meetvent.service.appUser.AppUserService;
import com.fasterxml.jackson.annotation.JsonView;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {
    private AppUserService appUserService;
    private AppUserRepository appUserRepository;

    public UserController(AppUserService appUserService,
                          AppUserRepository appUserRepository) {
        this.appUserService = appUserService;
        this.appUserRepository = appUserRepository;
    }

    @GetMapping()
    public AppUserDTO getUser(@RequestHeader(SecurityConstants.JWT_HEADER) String token) {
        AppUser appUser = this.appUserService.getUserFromToken(token);
        return new AppUserDTO(appUser);
    }

//    @GetMapping("/events")
//    @JsonView(Views.Public.class)
//    public List<Event> getUserEvents(@RequestHeader(SecurityConstants.JWT_HEADER) String token) {
//        return this.appUserService.getUserEventsFromToken(token);
//    }

    @PostMapping(path="/image", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
    public ResponseEntity<AppUser> updateImage(@RequestHeader(SecurityConstants.JWT_HEADER) String token, @ModelAttribute MultipartFile image) throws IOException {
        AppUser user = this.appUserService.updateUserProfile(token, image);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(user.getId()).toUri();
        user = this.appUserRepository.save(user);
        if(user.getImage() != null) {
            user.setImageUri(location);
            this.appUserRepository.save(user);
        }
        return new ResponseEntity<>(user, HttpStatus.CREATED);
    }

    @GetMapping("/image/{id}")
    public ResponseEntity<?> getImage(@PathVariable String id) {
        byte[] image = this.appUserService.getProfileImage(id);
        return ResponseEntity.status(HttpStatus.OK).contentType(MediaType.valueOf("image/png")).body(image);
    }

}
