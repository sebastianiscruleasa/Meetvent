package com.chs.meetvent.config;

import com.chs.meetvent.domain.AppUser;
import com.chs.meetvent.repository.AppUserRepository;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class MeetventUserDetails implements UserDetailsService {

    private AppUserRepository appUserRepository;

    public MeetventUserDetails(AppUserRepository appUserRepository) {
        this.appUserRepository = appUserRepository;
    }
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        String email, password = null;
        List<GrantedAuthority> authorities = null;
        List<AppUser> appUser = this.appUserRepository.findAppUserByEmail(username);
        if(appUser.size() == 0) {
            throw new UsernameNotFoundException("User details not found for the user : " + username);
        } else {
            email = appUser.get(0).getEmail();
            password = appUser.get(0).getPassword();
            authorities = new ArrayList<>();
            authorities.add(new SimpleGrantedAuthority(appUser.get(0).getRole()));
        }
        return new User(email, password, authorities);
    }
}
