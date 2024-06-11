package com.backend.meetvent.controllers;

import com.backend.meetvent.constants.SecurityConstants;
import com.backend.meetvent.domain.dto.Chat.MessageDTO;
import com.backend.meetvent.domain.dto.Chat.ReceivedMessageDTO;
import com.backend.meetvent.service.chat.MessageService;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

import static java.lang.Long.parseLong;

@Controller
public class ChatController {
    private final SimpMessagingTemplate simpMessagingTemplate;
    private final MessageService messageService;
    public ChatController(SimpMessagingTemplate simpMessagingTemplate,
                          MessageService messageService) {
        this.simpMessagingTemplate = simpMessagingTemplate;
        this.messageService = messageService;
    }

    @PutMapping("/private-messages/update/{id}")
    public @ResponseBody HashMap<String, Boolean> updateMessagesReadState(@PathVariable String id, @RequestHeader(SecurityConstants.JWT_HEADER) String token) {
        return this.messageService.updateMessagesReadState(token, Long.parseLong(id));
    }

    @GetMapping("/private-messages/{id}")
    public @ResponseBody List<ReceivedMessageDTO> getPrivateMessages(@PathVariable String id, @RequestHeader(SecurityConstants.JWT_HEADER) String token) {
        return this.messageService.getConversationMessages(token, parseLong(id));
    }

    @MessageMapping("/private-message")
    public ReceivedMessageDTO receiveMessage(@Payload MessageDTO messageDTO){
        ReceivedMessageDTO receivedMessageDTO = this.messageService.saveMessage(messageDTO);
        simpMessagingTemplate.convertAndSendToUser(messageDTO.getReceiverId(),"/private", receivedMessageDTO);
        return receivedMessageDTO;
    }
}
