package com.example.demo.service;

import com.example.demo.entity.GameLogEntity;
import com.example.demo.repository.GameLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GameLogService {
    
    @Autowired
    private GameLogRepository gameLogRepository;

    public GameLogEntity findByUserIdAndGame(String userId, String gameType) {
        return gameLogRepository.findByUserIdAndGameType(userId, gameType);
    }
}
