package com.example.demo.entity;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;

import java.time.LocalDateTime;

@Document(collection = "messages")
public class MessageEntity {

    @Id
    @JsonSerialize(using = ToStringSerializer.class)
    private ObjectId id;

    @DBRef
    private UsersEntity sender;

    @DBRef
    private UsersEntity receiver;

    private String content;
    private MessageType messageType = MessageType.TEXT;
    private boolean isRead = false;
    private boolean isDeleted = false;
    
    private LocalDateTime sentAt;
    private LocalDateTime readAt;

    public enum MessageType {
        TEXT,
        IMAGE,
        FILE
    }

    public MessageEntity() {
        this.sentAt = LocalDateTime.now();
    }

    public MessageEntity(UsersEntity sender, UsersEntity receiver, String content) {
        this();
        this.sender = sender;
        this.receiver = receiver;
        this.content = content;
    }

    public MessageEntity(UsersEntity sender, UsersEntity receiver, String content, MessageType messageType) {
        this(sender, receiver, content);
        this.messageType = messageType;
    }

    public ObjectId getId() {
        return id;
    }

    public void setId(ObjectId id) {
        this.id = id;
    }

    public UsersEntity getSender() {
        return sender;
    }

    public void setSender(UsersEntity sender) {
        this.sender = sender;
    }

    public UsersEntity getReceiver() {
        return receiver;
    }

    public void setReceiver(UsersEntity receiver) {
        this.receiver = receiver;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public MessageType getMessageType() {
        return messageType;
    }

    public void setMessageType(MessageType messageType) {
        this.messageType = messageType;
    }

    public boolean isRead() {
        return isRead;
    }

    public void setRead(boolean read) {
        isRead = read;
        if (read && readAt == null) {
            this.readAt = LocalDateTime.now();
        }
    }

    public boolean isDeleted() {
        return isDeleted;
    }

    public void setDeleted(boolean deleted) {
        isDeleted = deleted;
    }

    public LocalDateTime getSentAt() {
        return sentAt;
    }

    public void setSentAt(LocalDateTime sentAt) {
        this.sentAt = sentAt;
    }

    public LocalDateTime getReadAt() {
        return readAt;
    }

    public void setReadAt(LocalDateTime readAt) {
        this.readAt = readAt;
    }
}