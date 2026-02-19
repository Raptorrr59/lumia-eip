package com.example.demo.entity;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;

import java.time.LocalDateTime;

public class CommentsEntity {
    @Id
    @JsonSerialize(using = ToStringSerializer.class)
    private ObjectId id;
    private String userId;
    private String userName;
    private String content;
    @Min(value = 0, message = "Score must be at least 0")
    @Max(value = 5, message = "Score must be at most 5")
    private Float score;
    private LocalDateTime createdAt;
    private Integer moduleId;
    private Integer courseId;

    @JsonSerialize(using = ToStringSerializer.class)
    private ObjectId parentCommentId;
    private boolean isReply;

    public CommentsEntity() {
        this.createdAt = LocalDateTime.now();
        this.isReply = false;
    }

    public ObjectId getId() {
        return id;
    }
    public void setId(ObjectId id) {
        this.id = id;
    }
    public String getUserId() {
        return userId;
    }
    public void setUserId(String userId) {
        this.userId = userId;
    }
    public String getContent() {
        return content;
    }
    public void setContent(String content) {
        this.content = content;
    }
    public Float getScore() {
        return score;
    }
    public void setScore(Float score) {
        this.score = score;
    }
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
    public Integer getModuleId() {
        return moduleId;
    }
    public void setModuleId(Integer moduleId) {
        this.moduleId = moduleId;
    }
    public Integer getCourseId() {
        return courseId;
    }
    public void setCourseId(Integer courseId) {
        this.courseId = courseId;
    }
    public String getUserName() {return userName;}
    public void setUserName(String userName) {this.userName = userName;}
    public ObjectId getParentCommentId() {
        return parentCommentId;
    }
    public void setParentCommentId(ObjectId parentCommentId) {
        this.parentCommentId = parentCommentId;
    }
    public boolean isReply() {
        return isReply;
    }
    public void setReply(boolean reply) {
        isReply = reply;
    }
}
