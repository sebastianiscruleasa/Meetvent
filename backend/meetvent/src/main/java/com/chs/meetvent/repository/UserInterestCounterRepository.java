package com.chs.meetvent.repository;

import com.chs.meetvent.domain.AppUser;
import com.chs.meetvent.domain.UserInterestCounter;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserInterestCounterRepository extends JpaRepository<UserInterestCounter, Long> {
    Optional<UserInterestCounter> findUserInterestCounterByInterestKeyAndAppUser(int interestKey, AppUser appUser);
    List<UserInterestCounter> findAllByAppUser(AppUser appUser);
}
