package com.chs.meetvent.repository;
import com.chs.meetvent.domain.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

public interface AppUserRepository extends JpaRepository<AppUser, Long> {
    Optional<AppUser> findAppUserByEmail(String email);
    Optional<AppUser> findByUsername(String username);

    Boolean existsAppUserByEmail(String username);
    Boolean existsAppUserByUsername(String username);
}
