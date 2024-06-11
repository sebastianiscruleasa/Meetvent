package com.backend.meetvent.repository;

import com.backend.meetvent.domain.AppUser;
import com.backend.meetvent.domain.UserInterestCounter;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserInterestCounterRepository extends JpaRepository<UserInterestCounter, Long> {
    Optional<UserInterestCounter> findUserInterestCounterByInterestKeyAndAppUser(int interestKey, AppUser appUser);
    List<UserInterestCounter> findAllByAppUser(AppUser appUser);
}
