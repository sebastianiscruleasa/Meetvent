package com.backend.meetvent.service.connection;

import com.backend.meetvent.repository.ConnectionRepository;
import com.backend.meetvent.service.appUser.AppUserService;
import com.backend.meetvent.service.chat.MessageService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ConnectionServiceImplTest {
    @Mock AppUserService appUserService;
    @Mock MessageService messageService;
    @Mock ConnectionRepository connectionRepository;
    @InjectMocks ConnectionServiceImpl connectionService;
    List<Long> seenProfilesAsUser1 = Arrays.asList(5L);
    List<Long> seenProfilesAsUser2 = Arrays.asList(2L, 3L);
    List<Long> declinedProfile = Arrays.asList(1L);
    @Test
    void testAlreadyViewedProfilesIds() {
        when(connectionRepository.findAppUser2IdsByAppUser1Id(4L)).thenReturn(seenProfilesAsUser1);
        when(connectionRepository.findAppUser1IdsByAppUser2IdAndUser2ResponseIsNotNull(4L)).thenReturn(seenProfilesAsUser2);
        when(connectionRepository.findAppUser1IdsByAppUser2IdAndUser1Response(4L, "NO")).thenReturn(declinedProfile);
        List<Long> profilesIds = this.connectionService.alreadyViewedProfilesIds(4L);
        assertEquals(profilesIds.size(), 4);
    }
}