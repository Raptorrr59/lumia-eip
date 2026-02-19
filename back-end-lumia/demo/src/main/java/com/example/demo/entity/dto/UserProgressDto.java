package com.example.demo.entity.dto;

import java.util.HashSet;
import java.util.Set;

public class UserProgressDto {
    private String id;
    private String userId;
    private Integer moduleId;
    private Set<Integer> completedCourses = new HashSet<>();
    private boolean moduleCompleted = false;

    public UserProgressDto() {}

    public UserProgressDto(String userId, Integer moduleId) {
        this.userId = userId;
        this.moduleId = moduleId;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public Integer getModuleId() { return moduleId; }
    public void setModuleId(Integer moduleId) { this.moduleId = moduleId; }

    public Set<Integer> getCompletedCourses() { return completedCourses; }
    public void setCompletedCourses(Set<Integer> completedCourses) { this.completedCourses = completedCourses; }

    public boolean isModuleCompleted() { return moduleCompleted; }
    public void setModuleCompleted(boolean moduleCompleted) { this.moduleCompleted = moduleCompleted; }
}
