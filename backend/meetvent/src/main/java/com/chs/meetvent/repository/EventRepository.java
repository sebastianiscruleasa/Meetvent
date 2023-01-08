package com.chs.meetvent.repository;

import com.chs.meetvent.domain.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

public interface EventRepository extends JpaRepository<Event, Long> {
}
