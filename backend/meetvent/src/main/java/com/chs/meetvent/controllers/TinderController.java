package com.chs.meetvent.controllers;

import com.chs.meetvent.constants.SecurityConstants;
import com.chs.meetvent.domain.AppUser;
import com.chs.meetvent.domain.dto.JSONMessageResponse;
import com.chs.meetvent.domain.dto.TinderResponseDTO;
import com.chs.meetvent.domain.views.Views;
import com.chs.meetvent.repository.AppUserRepository;
import com.chs.meetvent.service.TinderService;
import com.fasterxml.jackson.annotation.JsonView;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/tinder")
public class TinderController {
    private TinderService tinderService;

    public TinderController(TinderService tinderService) {
        this.tinderService = tinderService;
    }

    @GetMapping("/users")
    @JsonView(Views.Public.class)
    public List<AppUser> findUsers(@RequestHeader(SecurityConstants.JWT_HEADER) String token) {
        return this.tinderService.findUsers(token);
    }

    @GetMapping("/matches")
    @JsonView(Views.Public.class)
    public List<AppUser> findMyMatches(@RequestHeader(SecurityConstants.JWT_HEADER) String token) {
        return this.tinderService.findMyMatches(token);
    }

    @PostMapping("/response/user/{id}")
    public ResponseEntity<?> yourResponseForUser(@RequestHeader(SecurityConstants.JWT_HEADER) String token, @PathVariable String id, @RequestBody TinderResponseDTO tinderResponse) {
        String statusAfterTinderLogic = this.tinderService.doTinderMatchLogic(token, id, tinderResponse.getResponse());
        return new ResponseEntity<>(new JSONMessageResponse(statusAfterTinderLogic), HttpStatus.OK);
    }

}
