package com.chs.meetvent.repository;

import com.chs.meetvent.domain.Event;
import org.springframework.data.repository.CrudRepository;

public interface EventRepository extends CrudRepository<Event, Long> {
}
