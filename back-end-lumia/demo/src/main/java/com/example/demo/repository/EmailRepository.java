package com.example.demo.repository;

import com.example.demo.entity.EmailEntity;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EmailRepository extends MongoRepository<EmailEntity, ObjectId> {
    Optional<EmailEntity> findByToken(String token);
    Optional<EmailEntity> findByUserId(String id);
}

