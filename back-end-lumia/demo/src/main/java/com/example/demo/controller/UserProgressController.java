package com.example.demo.controller;

import com.example.demo.entity.dto.UserProgressDto;
import com.example.demo.service.UserProgressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/")
@RestController
public class UserProgressController {

    @Autowired
    private UserProgressService progressService;

    @PostMapping("/complete-course")
    public ResponseEntity<UserProgressDto> completeCourse(
            @RequestParam String userId,
            @RequestParam Integer courseId,
            @RequestParam Integer moduleId) {

        try {
            UserProgressDto progress = progressService.markCourseAsCompleted(userId, courseId, moduleId);
            return ResponseEntity.ok(progress);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/complete-module")
    public ResponseEntity<UserProgressDto> completeModule(@RequestParam String userId, @RequestParam Integer moduleId) {
        try {
            UserProgressDto progress = progressService.markModuleAsCompleted(userId, moduleId);

            return ResponseEntity.ok(progress);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/user/{userId}/module/{moduleId}")
    public ResponseEntity<UserProgressDto> getUserProgress(
            @PathVariable String userId,
            @PathVariable Integer moduleId) {

        UserProgressDto progress = progressService.getUserProgress(userId, moduleId);
        return ResponseEntity.ok(progress);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<UserProgressDto>> getAllUserProgress(@PathVariable String userId) {
        List<UserProgressDto> progressList = progressService.getAllUserProgress(userId);
        return ResponseEntity.ok(progressList);
    }

    @GetMapping("/user/{userId}/completed-modules")
    public ResponseEntity<List<UserProgressDto>> getCompletedModules(@PathVariable String userId) {
        List<UserProgressDto> completedModules = progressService.getCompletedModules(userId);
        return ResponseEntity.ok(completedModules);
    }

    @GetMapping("/check-course")
    public ResponseEntity<Boolean> isCourseCompleted(
            @RequestParam String userId,
            @RequestParam Integer courseId,
            @RequestParam Integer moduleId) {

        boolean isCompleted = progressService.isCourseCompleted(userId, courseId, moduleId);
        return ResponseEntity.ok(isCompleted);
    }

    @GetMapping("/check-module")
    public ResponseEntity<Boolean> isModuleCompleted(
            @RequestParam String userId,
            @RequestParam Integer moduleId) {

        boolean isCompleted = progressService.isModuleCompleted(userId, moduleId);
        return ResponseEntity.ok(isCompleted);
    }
}
