package com.backend.meetvent.domain.dto;

public class JSONMessageResponse {
    private String message;

    public JSONMessageResponse(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
