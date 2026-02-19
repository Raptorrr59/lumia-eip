package com.example.demo.repository;

import com.example.demo.entity.FriendshipEntity;
import com.example.demo.entity.UsersEntity;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FriendshipRepository extends MongoRepository<FriendshipEntity, ObjectId> {

    @Query("{ $or: [ { 'requester.$id': ?0, 'addressee.$id': ?1 }, { 'requester.$id': ?1, 'addressee.$id': ?0 } ] }")
    Optional<FriendshipEntity> findFriendshipBetweenUsers(ObjectId user1Id, ObjectId user2Id);

    @Query("{ $and: [ { 'status': 'ACCEPTED' }, { $or: [ { 'requester.$id': ?0 }, { 'addressee.$id': ?0 } ] } ] }")
    List<FriendshipEntity> findAcceptedFriendshipsByUserId(ObjectId userId);

    @Query("{ 'addressee.$id': ?0, 'status': 'PENDING' }")
    List<FriendshipEntity> findPendingRequestsForUser(ObjectId userId);

    @Query("{ 'requester.$id': ?0, 'status': 'PENDING' }")
    List<FriendshipEntity> findPendingRequestsByUser(ObjectId userId);

    @Query("{ $and: [ { 'status': ?1 }, { $or: [ { 'requester.$id': ?0 }, { 'addressee.$id': ?0 } ] } ] }")
    List<FriendshipEntity> findFriendshipsByUserIdAndStatus(ObjectId userId, FriendshipEntity.FriendshipStatus status);

    @Query("{ $and: [ { 'status': 'ACCEPTED' }, { $or: [ { 'requester.$id': ?0, 'addressee.$id': ?1 }, { 'requester.$id': ?1, 'addressee.$id': ?0 } ] } ] }")
    Optional<FriendshipEntity> findAcceptedFriendshipBetweenUsers(ObjectId user1Id, ObjectId user2Id);
}