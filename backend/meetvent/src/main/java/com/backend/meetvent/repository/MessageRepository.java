package com.backend.meetvent.repository;

import com.backend.meetvent.domain.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Long> {
    @Query("select m from Message m where " +
            "(m.receiver.id = :user1Id and m.sender.id = :user2Id) " +
            "or (m.receiver.id = :user2Id and m.sender.id = :user1Id) " +
            "order by m.id desc")
    List<Message> getConversationMessages(Long user1Id, Long user2Id);

    @Query("select m from Message m where " +
            "(m.receiver.id = :user1Id and m.sender.id = :user2Id) " +
            "or (m.receiver.id = :user2Id and m.sender.id = :user1Id) " +
            "order by m.id desc " +
            "limit 1")
    Message getLastConversationMessage(Long user1Id, Long user2Id);

    @Modifying
    @Query("update Message m set " +
            "m.isRead = true where " +
            "m.receiver.id = :userId and m.sender.id = :contactId and m.isRead = false ")
    void updateMessageReadStateForConversation(Long userId, Long contactId);
}
