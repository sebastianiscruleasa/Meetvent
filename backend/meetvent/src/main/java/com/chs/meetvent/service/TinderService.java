package com.chs.meetvent.service;

import com.chs.meetvent.domain.AppUser;

import java.util.List;

public interface TinderService {
    public List<AppUser> findUsers(String userToken);
    public String doTinderMatchLogic(String userToken, String contactId, String tinderResponse);
    public List<AppUser> findMyMatches(String userToken);
}
