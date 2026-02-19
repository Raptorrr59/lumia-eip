package com.example.demo.entity;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;

import java.time.LocalDateTime;

@Document(collection = "friendships")
public class FriendshipEntity {

    @Id
    @JsonSerialize(using = ToStringSerializer.class)
    private ObjectId id;

    @DBRef
    private UsersEntity requester; // User who sent the friend request

    @DBRef
    private UsersEntity addressee; // User who received the friend request

    private FriendshipStatus status; // PENDING, ACCEPTED, DECLINED, BLOCKED

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public enum FriendshipStatus {
        PENDING,
        ACCEPTED,
        DECLINED,
        BLOCKED
    }

    public FriendshipEntity() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    public FriendshipEntity(UsersEntity requester, UsersEntity addressee, FriendshipStatus status) {
        this();
        this.requester = requester;
        this.addressee = addressee;
        this.status = status;
    }

    public ObjectId getId() {
        return id;
    }

    public void setId(ObjectId id) {
        this.id = id;
    }

    public UsersEntity getRequester() {
        return requester;
    }

    public void setRequester(UsersEntity requester) {
        this.requester = requester;
    }

    public UsersEntity getAddressee() {
        return addressee;
    }

    public void setAddressee(UsersEntity addressee) {
        this.addressee = addressee;
    }

    public FriendshipStatus getStatus() {
        return status;
    }

    public void setStatus(FriendshipStatus status) {
        this.status = status;
        this.updatedAt = LocalDateTime.now();
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}