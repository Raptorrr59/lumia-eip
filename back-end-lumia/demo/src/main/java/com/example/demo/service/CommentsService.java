package com.example.demo.service;

import com.example.demo.entity.CommentsEntity;
import com.example.demo.repository.CommentsRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class CommentsService {

    @Autowired
    private CommentsRepository commentsRepository;

    public CommentsEntity createComment(Integer moduleId, Integer courseId, String userId, String content,
                                        Float score, String username) {
        if (moduleId == null || courseId == null || userId == null || content == null ||
                score == null || username == null) {
            throw new IllegalArgumentException("Arguments can't be null");
        }

        CommentsEntity commentsEntity = new CommentsEntity();
        commentsEntity.setContent(content);
        commentsEntity.setCreatedAt(LocalDateTime.now());
        commentsEntity.setModuleId(moduleId);
        commentsEntity.setCourseId(courseId);
        commentsEntity.setUserId(userId);
        commentsEntity.setScore(score);
        commentsEntity.setUserName(username);

        return commentsRepository.save(commentsEntity);
    }

    public List<CommentsEntity> getCommentsByModuleIdAndCourseId(Integer moduleId, Integer courseId) {
        if (moduleId == null || courseId == null) {
            throw new IllegalArgumentException("ModuleId and courseId must not be null");
        }
        return commentsRepository.getCommentsByModuleIdAndCourseId(moduleId, courseId);
    }

    public List<CommentsEntity> getCommentsByScore(Float score) {
        if (score == null) {
            throw new IllegalArgumentException("Score must not be null");
        }
        return commentsRepository.findTop5CommentsByScore(score);
    }

    public CommentsEntity createReply(String commentId, String userId, String content, String username) {
        if (commentId == null || userId == null || content == null || username == null) {
            throw new IllegalArgumentException("Arguments can't be null");
        }

        ObjectId parentId = new ObjectId(commentId);
        Optional<CommentsEntity> parentCommentOpt = commentsRepository.findById(parentId);

        if (parentCommentOpt.isEmpty()) {
            throw new IllegalArgumentException("Parent comment not found");
        }

        CommentsEntity parentComment = parentCommentOpt.get();

        CommentsEntity reply = new CommentsEntity();
        reply.setContent(content);
        reply.setCreatedAt(LocalDateTime.now());
        reply.setModuleId(parentComment.getModuleId());
        reply.setCourseId(parentComment.getCourseId());
        reply.setUserId(userId);
        reply.setUserName(username);
        reply.setParentCommentId(parentId);
        reply.setReply(true);
        reply.setScore(0.0f);

        return commentsRepository.save(reply);
    }

    public List<CommentsEntity> getRepliesByCommentId(String commentId) {
        if (commentId == null) {
            throw new IllegalArgumentException("CommentId must not be null");
        }
        ObjectId parentId = new ObjectId(commentId);
        return commentsRepository.findByParentCommentId(parentId);
    }

    public Page<CommentsEntity> getCommentsPaginated(Integer moduleId, Integer courseId, int page, int size) {
        // Convertir page 1 → 0, page 2 → 1, etc.
        int correctedPage = Math.max(page - 1, 0);

        Pageable pageable = PageRequest.of(correctedPage, size);
        return commentsRepository.findByModuleIdAndCourseId(moduleId, courseId, pageable);
    }

}