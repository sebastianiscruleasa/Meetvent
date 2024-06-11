package com.backend.meetvent.repository;

import com.backend.meetvent.domain.Connection;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class ConnectionRepositoryTest {
    @Autowired private ConnectionRepository connectionRepository;
    @Test
    void findAllByAppUser2_IdAndUser1ResponseAndUser2Response() {
        List<Connection> connections = connectionRepository.findAllByAppUser1_Id(1L);
        assertEquals(connections.size(), 4);
    }

    @Test
    void testRecommendPeopleWhoLikeMyProfileAlready() {
        List<Long> peopleIds = connectionRepository.findAppUser1IdsByAppUser2_IdAndUser1ResponseAndUser2ResponseIsNotNull(4L, "YES");
        assertEquals(peopleIds.size(), 0);
    }

    @Test
    void testSeenProfilesAsUser2() {
        List<Long> appUser1Ids= connectionRepository.findAppUser1IdsByAppUser2IdAndUser2ResponseIsNotNull(4L);
        assertEquals(appUser1Ids.size(), 2);
    }

    @Test void testSeenProfilesAsUser1() {
        List<Long> appUser2Ids= connectionRepository.findAppUser2IdsByAppUser1Id(4L);
        assertEquals(appUser2Ids.size(), 1);
    }

    @Test void testDeclinedProfilesForUser2() {
        List<Long> peopleIds= connectionRepository.findAppUser1IdsByAppUser2IdAndUser1Response(4L, "NO");
        assertEquals(peopleIds.size(), 1);
    }
}