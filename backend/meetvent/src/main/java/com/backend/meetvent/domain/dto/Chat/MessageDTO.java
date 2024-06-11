package com.backend.meetvent.domain.dto.Chat;

import com.backend.meetvent.domain.Message;

import java.time.LocalDateTime;

public class MessageDTO {
    private String receiverId;
    private String senderId;
    private String text;
    private LocalDateTime createdAt;
    private Boolean isRead;

    public MessageDTO(Message message) {
        this.receiverId = String.valueOf(message.getReceiver().getId());
        this.senderId = String.valueOf(message.getSender().getId());
        this.text = message.getText();
        this.createdAt = message.getCreatedAt();
        this.isRead = message.getRead();
    }

    public MessageDTO() {}

    public String getReceiverId() {
        return receiverId;
    }

    public void setReceiverId(String receiverId) {
        this.receiverId = receiverId;
    }

    public String getSenderId() {
        return senderId;
    }

    public void setSenderId(String senderId) {
        this.senderId = senderId;
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

    public Boolean getRead() {
        return isRead;
    }
}
