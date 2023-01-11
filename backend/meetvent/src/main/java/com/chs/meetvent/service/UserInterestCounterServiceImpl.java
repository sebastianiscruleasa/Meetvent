package com.chs.meetvent.service;

import com.chs.meetvent.domain.AppUser;
import com.chs.meetvent.domain.UserInterestCounter;
import com.chs.meetvent.repository.UserInterestCounterRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserInterestCounterServiceImpl implements UserInterestCounterService{
    private UserInterestCounterRepository userInterestCounterRepository;

    public UserInterestCounterServiceImpl(UserInterestCounterRepository userInterestCounterRepository) {
        this.userInterestCounterRepository = userInterestCounterRepository;
    }

    @Override
    public UserInterestCounter updateUserInterestCounter(int id, AppUser appUser) {
        UserInterestCounter userInterestCounter = this.userInterestCounterRepository.findUserInterestCounterByInterestKeyAndAppUser(id, appUser).get();
        userInterestCounter.setCounterEvents(userInterestCounter.getCounterEvents() + 1);
        return this.userInterestCounterRepository.save(userInterestCounter);
    }

    @Override
    public UserInterestCounter saveNewElement(int id, AppUser appUser) {
        UserInterestCounter userInterestCounter = new UserInterestCounter();
        userInterestCounter.setInterestKey(id);
        userInterestCounter.setAppUser(appUser);
        userInterestCounter.setCounterEvents(1);
        return this.userInterestCounterRepository.save(userInterestCounter);
    }
}
