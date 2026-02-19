package com.example.demo.entity;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.HashSet;
import java.util.Set;

@Document(collection = "user_progress")
public class UserProgressEntity {
    @Id
    @JsonSerialize
    private ObjectId id;
    private String userId;
    private Integer moduleId;
    private Set<Integer> completedCourses = new HashSet<>();
    private boolean moduleCompleted = false;

    public ObjectId getId() {
        return id;
    }

    public String getUserId() {
        return userId;
    }
    public void setUserId(String userId) {
        this.userId = userId;
    }
    public Integer getModuleId() {
        return moduleId;
    }
    public void setModuleId(Integer moduleId) {
        this.moduleId = moduleId;
    }
    public Set<Integer> getCompletedCourses() {
        return completedCourses;
    }
    public void setCompletedCourses(Set<Integer> completedCourses) {
        this.completedCourses = completedCourses;
    }
    public boolean isModuleCompleted() {
        return moduleCompleted;
    }
    public void setModuleCompleted(boolean moduleCompleted) {
        this.moduleCompleted = moduleCompleted;
    }
}
