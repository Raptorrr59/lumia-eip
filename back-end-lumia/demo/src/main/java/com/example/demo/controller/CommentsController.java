package com.example.demo.controller;

import com.example.demo.entity.CommentsEntity;
import com.example.demo.entity.UsersEntity;
import com.example.demo.repository.CommentsRepository;
import com.example.demo.repository.UsersRepository;
import com.example.demo.service.CommentsService;
import com.example.demo.service.UsersService;
import jakarta.validation.Valid;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/")
public class CommentsController {
    @Autowired
    private CommentsService commentsService;
    @Autowired
    private CommentsRepository commentsRepository;
    @Autowired
    private UsersService usersService;
    @Autowired
    private UsersRepository usersRepository;

    @PostMapping("/new-comments")
    public ResponseEntity<CommentsEntity> createComment(@Valid @RequestBody CommentsEntity commentRequest) {
        CommentsEntity comment = commentsService.createComment(commentRequest.getModuleId(), commentRequest.getCourseId(),
                commentRequest.getUserId(), commentRequest.getContent(), commentRequest.getScore(), commentRequest.getUserName());
        return ResponseEntity.status(HttpStatus.CREATED).body(comment);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/comments/{commentId}/reply")
    public ResponseEntity<CommentsEntity> createReply(
            @PathVariable String commentId,
            @RequestBody Map<String, String> replyRequest,
            Authentication authentication) {

        if (authentication == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String userId = replyRequest.get("userId");
        String content = replyRequest.get("content");
        String username = replyRequest.get("userName");

        if (userId == null || content == null || username == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

        try {
            CommentsEntity reply = commentsService.createReply(commentId, userId, content, username);
            return ResponseEntity.status(HttpStatus.CREATED).body(reply);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @GetMapping("/comments")
    public ResponseEntity<List<CommentsEntity>> getAllComments(@RequestParam() Integer moduleId, @RequestParam() Integer courseId) {
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(commentsService.getCommentsByModuleIdAndCourseId(moduleId, courseId));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/comments/{commentId}/with-replies")
    public ResponseEntity<Map<String, Object>> getCommentWithReplies(@PathVariable String commentId) {
        try {
            ObjectId id = new ObjectId(commentId);
            Optional<CommentsEntity> commentOpt = commentsRepository.findById(id);

            if (commentOpt.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }

            CommentsEntity comment = commentOpt.get();
            List<CommentsEntity> replies = commentsService.getRepliesByCommentId(commentId);

            Map<String, Object> result = new HashMap<>();
            result.put("comment", comment);
            result.put("replies", replies);

            return ResponseEntity.status(HttpStatus.OK).body(result);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @GetMapping("/top-scores")
    public ResponseEntity<List<CommentsEntity>> getTopComments(@RequestParam() Float score) {
        List<CommentsEntity> comments = commentsService.getCommentsByScore(score);
        return ResponseEntity.status(HttpStatus.OK).body(comments);
    }

    @GetMapping("/user-comments")
    public ResponseEntity<List<CommentsEntity>> getUserComments(@RequestParam() String username, Authentication authentication) {

        Optional<UsersEntity> userOpt = usersRepository.findByUserName(username);

        if (userOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        UsersEntity user = userOpt.get();

        if (usersService.isAdmin(authentication)) {
            List<CommentsEntity> comments = commentsRepository.getByUserName(username);
            return ResponseEntity.status(HttpStatus.OK).body(comments);
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/user-comments")
    public ResponseEntity<Void> deleteUserComments(@RequestParam String username, Authentication authentication) {
        Optional<UsersEntity> userOpt = usersRepository.findByUserName(username);

        if (userOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        UsersEntity user = userOpt.get();

        if (usersService.isAdmin(authentication)) {
            List<CommentsEntity> comments = commentsRepository.getByUserName(username);
            commentsRepository.deleteAll(comments);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/comment/{id}")
    public ResponseEntity<Void> deleteComment(@RequestParam String messageId, @RequestParam String username, Authentication authentication) {

        ObjectId userId = new ObjectId(messageId);

        Optional<UsersEntity> userOpt = usersRepository.findByUserName(username);
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        UsersEntity user = userOpt.get();

        if (usersService.isAdmin(authentication)) {
            Optional<CommentsEntity> commentOpt = commentsRepository.findById(userId);
            if (commentOpt.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
            commentsRepository.deleteById(userId);
            return ResponseEntity.status(HttpStatus.OK).build();
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }

    @GetMapping("/comments/paginated")
    public Page<CommentsEntity> getComments(
            @RequestParam Integer moduleId,
            @RequestParam Integer courseId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        return commentsService.getCommentsPaginated(moduleId, courseId, page, size);
    }
}