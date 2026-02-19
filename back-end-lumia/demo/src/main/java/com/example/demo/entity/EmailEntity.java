package com.example.demo.entity;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;

import java.time.LocalDateTime;

public class EmailEntity {
    @Id
    private ObjectId id;

    private String token;

    private String userId;

    private LocalDateTime createdAt;
    private LocalDateTime expiredAt;

    public EmailEntity(String token, String userId) {
        this.token = token;
        this.userId = userId;
        this.createdAt = LocalDateTime.now();
        this.expiredAt = createdAt.plusHours(24); // Expire après 24h
    }

    public ObjectId getId() {
        return id;
    }

    public void setId(ObjectId id) {
        this.id = id;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getExpiredAt() {
        return expiredAt;
    }

    public void setExpiredAt(LocalDateTime expiredAt) {
        this.expiredAt = expiredAt;
    }
}

