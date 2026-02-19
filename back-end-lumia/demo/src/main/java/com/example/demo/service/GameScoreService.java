package com.example.demo.service;

import com.example.demo.GameName;
import com.example.demo.entity.GameScoreEntity;
import com.example.demo.repository.GameScoreRepository;
import org.springframework.stereotype.Service;

@Service
public class GameScoreService {
    private final GameScoreRepository gameScoreRepository;

    public GameScoreService(GameScoreRepository gameScoreRepository) {
        this.gameScoreRepository = gameScoreRepository;
    }

    public GameScoreEntity saveGameScore(GameScoreEntity gameScoreEntity) {
        try {
            GameName.valueOf(gameScoreEntity.getGameName().toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Invalid game name: " + gameScoreEntity.getGameName());
        }
        return gameScoreRepository.save(gameScoreEntity);
    }
}
