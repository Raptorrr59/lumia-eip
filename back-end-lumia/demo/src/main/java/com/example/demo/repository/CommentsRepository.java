package com.example.demo.repository;

import com.example.demo.entity.CommentsEntity;
import org.bson.types.ObjectId;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentsRepository extends MongoRepository<CommentsEntity, ObjectId> {
    List<CommentsEntity> getCommentsByModuleIdAndCourseId(Integer moduleId, Integer courseId);
    List<CommentsEntity> findTop5CommentsByScore(Float score);
    List<CommentsEntity> findByUserName(String userName);
    List<CommentsEntity> findByParentCommentId(ObjectId parentCommentId);
    List<CommentsEntity> getByUserName(String userName);
    Page<CommentsEntity> findByModuleIdAndCourseId(Integer moduleId, Integer courseId, Pageable pageable);
    void deleteByUserId(String userId);
}
