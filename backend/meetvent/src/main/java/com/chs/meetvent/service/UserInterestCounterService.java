package com.chs.meetvent.service;

import com.chs.meetvent.domain.AppUser;
import com.chs.meetvent.domain.UserInterestCounter;

import java.util.List;
import java.util.Optional;

public interface UserInterestCounterService {
    UserInterestCounter updateUserInterestCounter(int id, AppUser appUser);
    UserInterestCounter saveNewElement(int id, AppUser appUser);
    List<UserInterestCounter> getAllInterestsForUser(AppUser appUser);
}
