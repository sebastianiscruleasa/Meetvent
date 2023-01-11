package com.chs.meetvent.repository;

import com.chs.meetvent.domain.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
public interface EventRepository extends JpaRepository<Event, Long> {
    List<Event> findAllByAddress_City(String city);
    List<Event> findAllByIdIn(List<Long> ids);
    List<Event> findAllByIdNotIn(List<Long> ids);
}
