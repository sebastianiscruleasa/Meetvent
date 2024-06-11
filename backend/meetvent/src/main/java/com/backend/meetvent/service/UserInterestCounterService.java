package com.backend.meetvent.service;

import com.backend.meetvent.domain.AppUser;
import com.backend.meetvent.domain.UserInterestCounter;
import com.backend.meetvent.domain.dto.UserInterestCounter.UserInterestCounterDTO;

import java.util.List;

public interface UserInterestCounterService {
    UserInterestCounter updateUserInterestCounter(int id, AppUser appUser);
    List<UserInterestCounter> getAllInterestsForUser(AppUser appUser);
    List<UserInterestCounterDTO> convertToUserInterestCounterDTOs(List<UserInterestCounter> userInterestCounters);
}
