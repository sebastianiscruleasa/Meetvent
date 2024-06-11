package com.backend.meetvent.domain.dto.UserInterestCounter;

public class UserInterestCounterDTO {
    private int interestKey;
    private int counterEvents;

    public UserInterestCounterDTO(int interestKey, int counterEvents) {
        this.interestKey = interestKey;
        this.counterEvents = counterEvents;
    }

    public int getInterestKey() {
        return interestKey;
    }

    public int getCounterEvents() {
        return counterEvents;
    }
}
