package com.backend.meetvent.repository;

import com.backend.meetvent.domain.AppUser;
import com.backend.meetvent.domain.Connection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ConnectionRepository extends JpaRepository<Connection, Long> {
    List<Connection> findAllByAppUser2_IdAndUser1ResponseAndUser2Response(Long appUser2Id, String user1Response, String user2Response);
    @Query("select c.appUser1.id from Connection c where " +
            "c.appUser2.id = :appUser2Id and c.user1Response = :user1Response and c.user2Response IS null ")
    List<Long> findAppUser1IdsByAppUser2_IdAndUser1ResponseAndUser2ResponseIsNotNull(Long appUser2Id, String user1Response);
    List<Connection> findAllByAppUser2_IdAndUser1Response(Long appUser2Id, String user1Response);
    List<Connection> findAllByAppUser2_IdAndUser2Response(Long appUser2Id, String user2Response);
    List<Connection> findAllByAppUser1_Id(Long appUser1Id);

    @Query("select c.appUser2.id from Connection c where " +
            "c.appUser1.id = :appUser1Id")
    List<Long> findAppUser2IdsByAppUser1Id(Long appUser1Id);

    @Query("select c.appUser1.id from Connection c where " +
            "c.appUser2.id = :appUser2Id and c.user2Response IS NOT null")
    List<Long> findAppUser1IdsByAppUser2IdAndUser2ResponseIsNotNull(Long appUser2Id);

    @Query("select c.appUser1.id from Connection c where " +
            "c.appUser2.id = :appUser2Id and c.user1Response = :user1Response ")
    List<Long> findAppUser1IdsByAppUser2IdAndUser1Response(Long appUser2Id, String user1Response);

    Optional<Connection> findByAppUser1_IdAndAndAppUser2_Id(Long appUser1Id, Long appUser2Id);
    List<Connection> findAllByAppUser1AndUser1ResponseAndUser2Response(AppUser appUser1Id, String user1Response, String user2Response);
    List<Connection> findAllByAppUser2AndUser1ResponseAndUser2Response(AppUser appUser2Id, String user1Response, String user2Response);
    @Query("select c.appUser2 from Connection c where " +
            "c.appUser1.id = :user1Id and (c.user1Response = 'YES' and c.user2Response = 'YES') ")
    List<AppUser> findUserConnectionsByUser1Id(Long user1Id);

    @Query("select c.appUser1 from Connection c where " +
            "c.appUser2.id = :user2Id and (c.user1Response = 'YES' and c.user2Response = 'YES') ")
    List<AppUser> findUserConnectionsByUser2Id(Long user2Id);
}
