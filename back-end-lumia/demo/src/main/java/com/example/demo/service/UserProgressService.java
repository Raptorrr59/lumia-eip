package com.example.demo.service;

import com.example.demo.entity.UserProgressEntity;
import com.example.demo.entity.dto.UserProgressDto;
import com.example.demo.repository.UserProgressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserProgressService {

    @Autowired
    private UserProgressRepository userProgressRepository;

    public UserProgressDto markCourseAsCompleted(String userId, Integer courseId, Integer moduleId) {
        UserProgressEntity progress = findOrCreateUserProgress(userId, moduleId);

        progress.getCompletedCourses().add(courseId);

        UserProgressEntity savedProgress = userProgressRepository.save(progress);

        return convertToDTO(savedProgress);
    }

    public UserProgressDto markModuleAsCompleted(String userId, Integer moduleId) {
        UserProgressEntity progress = findOrCreateUserProgress(userId, moduleId);

        progress.setModuleCompleted(true);

        UserProgressEntity savedProgress = userProgressRepository.save(progress);

        return convertToDTO(savedProgress);
    }

    private UserProgressEntity findOrCreateUserProgress(String userId, Integer moduleId) {
        Optional<UserProgressEntity> existingProgress = userProgressRepository
                .findByUserIdAndModuleId(userId, moduleId);

        if (existingProgress.isPresent()) {
            return existingProgress.get();
        }

        UserProgressEntity newProgress = new UserProgressEntity();
        newProgress.setUserId(userId);
        newProgress.setModuleId(moduleId);
        newProgress.setCompletedCourses(new HashSet<>());
        newProgress.setModuleCompleted(false);

        return newProgress;
    }

    public UserProgressDto getUserProgress(String userId, Integer moduleId) {
        Optional<UserProgressEntity> progress = userProgressRepository.findByUserIdAndModuleId(userId, moduleId);

        return progress.map(this::convertToDTO).orElseGet(() -> new UserProgressDto(userId, moduleId));
    }

    public List<UserProgressDto> getCompletedModules(String userId) {
        List<UserProgressEntity> progressList = userProgressRepository.findByUserIdAndModuleCompleted(userId, true);
        return progressList.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<UserProgressDto> getAllUserProgress(String userId) {
        List<UserProgressEntity> progressList = userProgressRepository.findByUserId(userId);
        return progressList.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public boolean isCourseCompleted(String userId, Integer courseId, Integer moduleId) {
        Optional<UserProgressEntity> progress = userProgressRepository.findByUserIdAndModuleId(userId, moduleId);
        return progress.map(p -> p.getCompletedCourses().contains(courseId)).orElse(false);
    }

    public boolean isModuleCompleted(String userId, Integer moduleId) {
        Optional<UserProgressEntity> progress = userProgressRepository.findByUserIdAndModuleId(userId, moduleId);
        return progress.map(UserProgressEntity::isModuleCompleted).orElse(false);
    }

    private UserProgressEntity createNewProgress(String userId, Integer moduleId) {
        UserProgressEntity progress = new UserProgressEntity();
        progress.setUserId(userId);
        progress.setModuleId(moduleId);
        return progress;
    }

    private UserProgressDto convertToDTO(UserProgressEntity entity) {
        UserProgressDto dto = new UserProgressDto();
        dto.setId(entity.getId() != null ? entity.getId().toString() : null);
        dto.setUserId(entity.getUserId());
        dto.setModuleId(entity.getModuleId());
        dto.setCompletedCourses(entity.getCompletedCourses());
        dto.setModuleCompleted(entity.isModuleCompleted());
        return dto;
    }
}
