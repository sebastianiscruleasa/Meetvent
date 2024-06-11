package com.backend.meetvent.api_error.exceptions;

public class UserAlreadyJoinedEventException extends RuntimeException{
    public UserAlreadyJoinedEventException(String message) {
        super(message);
    }
}
