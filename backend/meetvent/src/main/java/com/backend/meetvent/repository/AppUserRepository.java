package com.backend.meetvent.repository;
import com.backend.meetvent.domain.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AppUserRepository extends JpaRepository<AppUser, Long> {
    Optional<AppUser> findAppUserByEmail(String email);
    Optional<AppUser> findByUsername(String username);
    Boolean existsAppUserByEmail(String username);
    Boolean existsAppUserByUsername(String username);
    List<AppUser> findAllByIdNotIn(List<Long> ids);
    List<AppUser> findAllByIdIn(List<Long> ids);
    Optional<AppUser> getAppUserById(Long id);
}
