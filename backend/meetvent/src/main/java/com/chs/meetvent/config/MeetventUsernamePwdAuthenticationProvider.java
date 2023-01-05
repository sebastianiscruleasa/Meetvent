package com.chs.meetvent.config;

import com.chs.meetvent.domain.AppUser;
import com.chs.meetvent.repository.AppUserRepository;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class MeetventUsernamePwdAuthenticationProvider implements AuthenticationProvider {

    private AppUserRepository appUserRepository;
    private PasswordEncoder passwordEncoder;

    public MeetventUsernamePwdAuthenticationProvider(AppUserRepository appUserRepository,
                                                     PasswordEncoder passwordEncoder) {
        this.appUserRepository = appUserRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        String email = authentication.getName();
        String password = authentication.getCredentials().toString();
        List<AppUser> appUser = appUserRepository.findAppUserByEmail(email);
        if(appUser.size() > 0 ){
            if(passwordEncoder.matches(password, appUser.get(0).getPassword())) {
                List<GrantedAuthority> authorities = new ArrayList<>();
                authorities.add(new SimpleGrantedAuthority(appUser.get(0).getRole()));
                return new UsernamePasswordAuthenticationToken(email, password, authorities);
            } else {
                throw new BadCredentialsException("Invalid password");
            }
        } else {
            throw new BadCredentialsException("No user registered with this details");
        }
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return (UsernamePasswordAuthenticationToken.class.isAssignableFrom(authentication));
    }
}
