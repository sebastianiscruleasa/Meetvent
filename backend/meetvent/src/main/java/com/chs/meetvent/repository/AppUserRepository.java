package com.chs.meetvent.repository;
import com.chs.meetvent.domain.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AppUserRepository extends CrudRepository<AppUser, Long> {
    List<AppUser> findAppUserByEmail(String email);
}
