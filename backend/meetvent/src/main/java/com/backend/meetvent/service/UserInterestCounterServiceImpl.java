package com.backend.meetvent.service;

import com.backend.meetvent.domain.AppUser;
import com.backend.meetvent.domain.UserInterestCounter;
import com.backend.meetvent.domain.dto.UserInterestCounter.UserInterestCounterDTO;
import com.backend.meetvent.repository.UserInterestCounterRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserInterestCounterServiceImpl implements UserInterestCounterService{
    private UserInterestCounterRepository userInterestCounterRepository;

    public UserInterestCounterServiceImpl(UserInterestCounterRepository userInterestCounterRepository) {
        this.userInterestCounterRepository = userInterestCounterRepository;
    }

    @Override
    public UserInterestCounter updateUserInterestCounter(int id, AppUser appUser) {
        UserInterestCounter userInterestCounter;
        if(this.userInterestCounterRepository.findUserInterestCounterByInterestKeyAndAppUser(id, appUser).isPresent()) {
            userInterestCounter = this.increaseUserInterestCounter(id, appUser);
        } else {
            userInterestCounter = this.createUserInterestCounter(id, appUser);
        }
        return this.userInterestCounterRepository.save(userInterestCounter);
    }

    private UserInterestCounter increaseUserInterestCounter(int id, AppUser appUser) {
        UserInterestCounter userInterestCounter = this.userInterestCounterRepository.findUserInterestCounterByInterestKeyAndAppUser(id, appUser).get();
        userInterestCounter.setCounterEvents(userInterestCounter.getCounterEvents() + 1);
        return userInterestCounter;
    }

    private UserInterestCounter createUserInterestCounter(int id, AppUser appUser) {
        UserInterestCounter userInterestCounter = new UserInterestCounter();
        userInterestCounter.setInterestKey(id);
        userInterestCounter.setAppUser(appUser);
        userInterestCounter.setCounterEvents(1);
        return userInterestCounter;
    }

    @Override
    public List<UserInterestCounter> getAllInterestsForUser(AppUser appUser) {
        return this.userInterestCounterRepository.findAllByAppUser(appUser);
    }

    @Override
    public List<UserInterestCounterDTO> convertToUserInterestCounterDTOs(List<UserInterestCounter> userInterestCounters) {
        return userInterestCounters.stream().
                map(userInterestCounter -> new UserInterestCounterDTO(userInterestCounter.getInterestKey(), userInterestCounter.getCounterEvents()))
                .collect(Collectors.toList());
    }
}
