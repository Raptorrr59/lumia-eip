package com.example.demo.repository;

import com.example.demo.entity.GameLogEntity;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface GameLogRepository extends MongoRepository<GameLogEntity, String> {
    List<GameLogEntity> findByGameTypeAndGameId(String gameType, int gameId);
    public GameLogEntity findByGameId(int gameId);
    public GameLogEntity findByUserIdAndGameType(String userId, String gameType);
    public GameLogEntity deleteByUserIdAndGameType(String userId, String gameId);
    List<GameLogEntity> findByUserId(String userId);
}
