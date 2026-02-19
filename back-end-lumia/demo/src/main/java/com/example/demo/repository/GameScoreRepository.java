package com.example.demo.repository;

import com.example.demo.entity.GameScoreEntity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface GameScoreRepository extends MongoRepository<GameScoreEntity, String> {
    List<GameScoreEntity> findByUserName(String username);
    List<GameScoreEntity> findByGameName(String gameName);
}
