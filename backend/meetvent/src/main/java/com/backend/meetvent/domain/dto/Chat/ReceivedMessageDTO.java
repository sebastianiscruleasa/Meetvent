package com.backend.meetvent.domain.dto.Chat;

import com.backend.meetvent.domain.Message;

import java.time.LocalDateTime;

public class ReceivedMessageDTO {
    private Long _id;
    private String text;
    private LocalDateTime createdAt;
    private ContactUserVO user;

    public ReceivedMessageDTO(Message message) {
        this._id = message.getId();
        this.text = message.getText();
        this.createdAt = message.getCreatedAt();
        this.user = new ContactUserVO(message.getSender());
    }

    public Long get_id() {
        return _id;
    }

    public void set_id(Long _id) {
        this._id = _id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public ContactUserVO getUser() {
        return user;
    }

    public void setUser(ContactUserVO user) {
        this.user = user;
    }
}
