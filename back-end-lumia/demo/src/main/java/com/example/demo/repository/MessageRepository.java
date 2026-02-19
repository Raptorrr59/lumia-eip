package com.example.demo.repository;

import com.example.demo.entity.MessageEntity;
import org.bson.types.ObjectId;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends MongoRepository<MessageEntity, ObjectId> {

    // Find all messages between two users, ordered by sentAt desc (newest first)
    @Query("{ $and: [ " +
           "{ 'isDeleted': false }, " +
           "{ $or: [ " +
           "  { 'sender.$id': ?0, 'receiver.$id': ?1 }, " +
           "  { 'sender.$id': ?1, 'receiver.$id': ?0 } " +
           "] } " +
           "] }")
    Page<MessageEntity> findMessagesBetweenUsers(ObjectId user1Id, ObjectId user2Id, Pageable pageable);

    // Find unread messages for a user
    @Query("{ 'receiver.$id': ?0, 'isRead': false, 'isDeleted': false }")
    List<MessageEntity> findUnreadMessagesForUser(ObjectId userId);

    // Find unread messages count for a user
    @Query(value = "{ 'receiver.$id': ?0, 'isRead': false, 'isDeleted': false }", count = true)
    long countUnreadMessagesForUser(ObjectId userId);

    // Find unread messages between two specific users
    @Query("{ 'sender.$id': ?0, 'receiver.$id': ?1, 'isRead': false, 'isDeleted': false }")
    List<MessageEntity> findUnreadMessagesBetweenUsers(ObjectId senderId, ObjectId receiverId);

    // Find last message between two users
    @Query("{ $and: [ " +
           "{ 'isDeleted': false }, " +
           "{ $or: [ " +
           "  { 'sender.$id': ?0, 'receiver.$id': ?1 }, " +
           "  { 'sender.$id': ?1, 'receiver.$id': ?0 } " +
           "] } " +
           "] }")
    List<MessageEntity> findLastMessageBetweenUsers(ObjectId user1Id, ObjectId user2Id);

    // Find all conversations for a user (distinct users they've messaged with)
    @Query("{ $and: [ " +
           "{ 'isDeleted': false }, " +
           "{ $or: [ { 'sender.$id': ?0 }, { 'receiver.$id': ?0 } ] } " +
           "] }")
    List<MessageEntity> findAllMessagesForUser(ObjectId userId);

    // Mark messages as read
    @Query("{ 'sender.$id': ?0, 'receiver.$id': ?1, 'isRead': false }")
    List<MessageEntity> findUnreadMessagesFromSender(ObjectId senderId, ObjectId receiverId);
}