package com.example.demo.repository;

import com.example.demo.entity.UserProgressEntity;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserProgressRepository extends MongoRepository<UserProgressEntity, ObjectId> {
    Optional<UserProgressEntity> findByUserIdAndModuleId(String userId, Integer moduleId);
    List<UserProgressEntity> findByUserId(String userId);
    List<UserProgressEntity> findByModuleId(String moduleId);
    List<UserProgressEntity> findByUserIdAndModuleCompleted(String userId, boolean moduleCompleted);

}
