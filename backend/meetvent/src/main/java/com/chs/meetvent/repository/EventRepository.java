package com.chs.meetvent.repository;

import com.chs.meetvent.domain.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
public interface EventRepository extends JpaRepository<Event, Long> {
    List<Event> findAllByAddress_City(String city);

    @Query("select e from Event e " +
            "left join e.attendees au " +
            "where e.address.city = :city " +
            "group by e.id " +
            "order by count(au.id) desc")
    List<Event> findAllByAddress_CityOrderByAttendeesSize(String city);
    List<Event> findAllByIdIn(List<Long> ids);
    List<Event> findAllByIdNotIn(List<Long> ids);
}
