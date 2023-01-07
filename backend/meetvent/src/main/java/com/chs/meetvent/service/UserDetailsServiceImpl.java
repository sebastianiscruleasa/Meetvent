package com.chs.meetvent.service;

import com.chs.meetvent.domain.AppUser;
import com.chs.meetvent.repository.AppUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    private AppUserRepository appUserRepository;

    public UserDetailsServiceImpl(AppUserRepository appUserRepository) {
        this.appUserRepository = appUserRepository;
    }

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        AppUser user = appUserRepository.findAppUserByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found with email: " + email));

        return UserDetailsImpl.build(user);
    }
}
