package com.chs.meetvent.controllers;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UserController {

    @GetMapping()
    public String helloUser(Authentication authentication) {
        return authentication.getName();
    }
}
