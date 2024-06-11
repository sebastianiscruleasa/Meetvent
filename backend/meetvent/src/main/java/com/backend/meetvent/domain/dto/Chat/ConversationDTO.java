package com.backend.meetvent.domain.dto.Chat;

public class ConversationDTO {
    private ContactUserVO contact;
    private MessageDTO message;

    public ConversationDTO(ContactUserVO contact, MessageDTO message) {
        this.contact = contact;
        this.message = message;
    }

    public ContactUserVO getContact() {
        return contact;
    }

    public MessageDTO getMessage() {
        return message;
    }
}
