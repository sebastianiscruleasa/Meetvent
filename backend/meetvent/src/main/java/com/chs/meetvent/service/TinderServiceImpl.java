package com.chs.meetvent.service;

import com.chs.meetvent.domain.AppUser;
import com.chs.meetvent.domain.TinderMatch;
import com.chs.meetvent.repository.AppUserRepository;
import com.chs.meetvent.repository.TinderMatchRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class TinderServiceImpl implements TinderService{
    private AppUserService appUserService;
    private TinderMatchRepository tinderMatchRepository;

    public TinderServiceImpl(AppUserService appUserService, TinderMatchRepository tinderMatchRepository) {
        this.appUserService = appUserService;
        this.tinderMatchRepository = tinderMatchRepository;
    }

    @Override
    public List<AppUser> findUsers(String userToken) {
        List<AppUser> yourNextUsers = new ArrayList<>();
        AppUser appUser = this.appUserService.getUserFromToken(userToken);
        List<TinderMatch> likeMatches = this.tinderMatchRepository.findAllByAppUser2_IdAndUser1ResponseAndUser2Response(appUser.getId(), "YES", null);
        List<Long> peopleIds = this.getPeopleWhoLikesYouIdsFromMatches(likeMatches);
        yourNextUsers.addAll(this.getPeopleWhoLikesYou(peopleIds));
        List<Long> notWantedProfilesIds = new ArrayList<>();
        notWantedProfilesIds.addAll(peopleIds);
        notWantedProfilesIds.addAll(this.alreadyViewedProfilesIds(appUser.getId()));
        yourNextUsers.addAll(this.getOtherPeople(notWantedProfilesIds, appUser.getId()));
        return yourNextUsers;
    }

    @Override
    public String doTinderMatchLogic(String userToken, String contactId, String tinderResponse) {
        AppUser appUser = this.appUserService.getUserFromToken(userToken);
        AppUser contactUser = this.appUserService.getAppUserById(contactId);
        Optional<TinderMatch> tinderMatch = this.tinderMatchRepository.findByAppUser1_IdAndAndAppUser2_Id(contactUser.getId(), appUser.getId());
        if(tinderMatch.isPresent()) {
            if(tinderResponse.equals("YES")) {
                tinderMatch.get().setUser2Response("YES");
                this.tinderMatchRepository.save(tinderMatch.get());
                return "MATCH";
            } else {
                tinderMatch.get().setAppUser2(appUser);
                tinderMatch.get().setUser2Response("NO");
                this.tinderMatchRepository.save(tinderMatch.get());
                return "FAILED";
            }
        } else {
            if(tinderResponse.equals("YES")) {
                this.createNewContact(appUser, contactUser, "YES");
                return "CONTACT";
            } else {
                this.createNewContact(appUser, contactUser, "NO");
                return "FAILED";
            }
        }
    }

    private List<Long> getPeopleWhoLikesYouIdsFromMatches(List<TinderMatch> matches) {
        ArrayList<Long> peopleIds = new ArrayList<>();
        for(TinderMatch match:matches) {
            peopleIds.add(match.getAppUser1().getId());
        }
        return peopleIds;
    }

    private List<AppUser> getPeopleWhoLikesYou(List<Long> peopleIds) {
        return this.appUserService.getAppUsersWithIdsInList(peopleIds);
    }

    private List<AppUser> getOtherPeople(List<Long> peopleWhoLikesYou, Long yourId) {
        List<Long> yourContactsIds = new ArrayList<>(peopleWhoLikesYou);
        yourContactsIds.add(yourId);
        return this.appUserService.getAppUsersWithIdsNotInList(yourContactsIds);
    }

    private List<Long> alreadyViewedProfilesIds(Long myId) {
        List<TinderMatch> seenProfileMatchesFirst = this.tinderMatchRepository.findAllByAppUser1_Id(myId);
        List<TinderMatch> seenProfileMatchesSecondYes = this.tinderMatchRepository.findAllByAppUser2_IdAndUser2Response(myId, "YES");
        List<TinderMatch> seenProfileMatchesSecondNO = this.tinderMatchRepository.findAllByAppUser2_IdAndUser2Response(myId, "NO");
        List<TinderMatch> declineMyProfile = this.tinderMatchRepository.findAllByAppUser2_IdAndUser1Response(myId, "NO");
        List<Long> idsForSeenUsers = new ArrayList<>();
        for(TinderMatch match:seenProfileMatchesFirst) {
            idsForSeenUsers.add(match.getAppUser2().getId());
        }
        for(TinderMatch match:seenProfileMatchesSecondYes) {
            idsForSeenUsers.add(match.getAppUser1().getId());
        }
        for(TinderMatch match:seenProfileMatchesSecondNO) {
            idsForSeenUsers.add(match.getAppUser1().getId());
        }
        for(TinderMatch match:declineMyProfile) {
            idsForSeenUsers.add(match.getAppUser1().getId());
        }
        return idsForSeenUsers;
    }

    public TinderMatch createNewContact(AppUser appUser1, AppUser appUser2, String tinderResponse) {
        TinderMatch tinderMatch = new TinderMatch();
        tinderMatch.setAppUser1(appUser1);
        tinderMatch.setAppUser2(appUser2);
        tinderMatch.setUser1Response(tinderResponse);
        return this.tinderMatchRepository.save(tinderMatch);
    }

    @Override
    public List<AppUser> findMyMatches(String userToken) {
        AppUser appUser = this.appUserService.getUserFromToken(userToken);
        List<TinderMatch> tinderMatchesAsUser1 = this.tinderMatchRepository.findAllByAppUser1AndUser1ResponseAndUser2Response(
                appUser,
                "YES",
                "YES"
        );
        List<TinderMatch> tinderMatchesAsUser2 = this.tinderMatchRepository.findAllByAppUser2AndUser1ResponseAndUser2Response(
                appUser,
                "YES",
                "YES"
        );
        List<Long> matchingPeopleIds = new ArrayList<>();
        for(TinderMatch tinderMatch:tinderMatchesAsUser1) {
            if(tinderMatch.getAppUser2().getId() != appUser.getId()) {
                matchingPeopleIds.add(tinderMatch.getAppUser2().getId());
            }
        }
        for(TinderMatch tinderMatch:tinderMatchesAsUser2) {
            if(tinderMatch.getAppUser1().getId() != appUser.getId()) {
                matchingPeopleIds.add(tinderMatch.getAppUser1().getId());
            }
        }
        return this.appUserService.getAppUsersWithIdsInList(matchingPeopleIds);
    }
}
