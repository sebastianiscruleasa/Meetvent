package com.backend.meetvent.service.connection;

import com.backend.meetvent.domain.AppUser;
import com.backend.meetvent.domain.dto.Chat.ContactUserVO;
import com.backend.meetvent.domain.dto.Chat.ConversationDTO;

import java.util.List;

public interface ConnectionService {
    List<AppUser> findUsers(String userToken);
    String doTinderMatchLogic(String userToken, String contactId, String tinderResponse);
    List<ConversationDTO> findMyConversations(String userToken);
}
