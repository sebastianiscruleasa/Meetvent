package com.chs.meetvent.repository;

import com.chs.meetvent.domain.AppUser;
import com.chs.meetvent.domain.TinderMatch;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TinderMatchRepository extends JpaRepository<TinderMatch, Long> {
    List<TinderMatch> findAllByAppUser2_IdAndUser1ResponseAndUser2Response(Long appUser2Id, String user1Response, String user2Response);
    List<TinderMatch> findAllByAppUser2_IdAndUser1Response(Long appUser2Id, String user1Response);
    List<TinderMatch> findAllByAppUser2_IdAndUser2Response(Long appUser2Id, String user2Response);
    List<TinderMatch> findAllByAppUser1_Id(Long appUser1Id);
    Optional<TinderMatch> findByAppUser1_IdAndAndAppUser2_Id(Long appUser1Id, Long appUser2Id);
    List<TinderMatch> findAllByAppUser1AndUser1ResponseAndUser2Response(AppUser appUser1Id, String user1Response, String user2Response);
    List<TinderMatch> findAllByAppUser2AndUser1ResponseAndUser2Response(AppUser appUser2Id, String user1Response, String user2Response);
}
