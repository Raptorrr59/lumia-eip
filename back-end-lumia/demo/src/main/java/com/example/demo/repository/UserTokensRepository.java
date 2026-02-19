package com.example.demo.repository;

import com.example.demo.entity.UserTokens;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserTokensRepository extends MongoRepository<UserTokens, ObjectId> {
    UserTokens findByUserId(ObjectId userId);
    void deleteByUserId(ObjectId userId);
    Optional<UserTokens> findByAccessToken(String accessToken);
}
