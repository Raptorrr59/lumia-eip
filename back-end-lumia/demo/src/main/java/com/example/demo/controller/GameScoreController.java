package com.example.demo.controller;

import com.example.demo.entity.GameScoreEntity;
import com.example.demo.exeption.CategoryNotFoundException;
import com.example.demo.repository.GameScoreRepository;
import com.example.demo.service.GameScoreService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@RequestMapping("/api/")
@RestController
public class GameScoreController {

    private final GameScoreRepository gameScoreRepository;
    private final GameScoreService gameScoreService;

    public GameScoreController(GameScoreRepository gameScoreRepository, GameScoreService gameScoreService) {
        this.gameScoreRepository = gameScoreRepository;
        this.gameScoreService = gameScoreService;
    }

    @PostMapping("/newScore")
    public ResponseEntity<GameScoreEntity> postScore(@RequestBody GameScoreEntity gameScoreEntity) {
        GameScoreEntity newGameScoreEntity = gameScoreService.saveGameScore(gameScoreEntity);
        return ResponseEntity.ok(newGameScoreEntity);
    }

    @GetMapping("/getByUser/{username}")
    public List<GameScoreEntity> getByUser(@PathVariable String username) {
        return gameScoreRepository.findByUserName(username);
    }

    @GetMapping("/ranking/{gameName}")
    public List<GameScoreEntity> getRanking(@PathVariable String gameName) {
        List<GameScoreEntity> gameUsers = gameScoreRepository.findByGameName(gameName);

        return gameUsers.stream()
                .sorted(Comparator.comparing(GameScoreEntity::getScore).reversed())
                .limit(10)
                .collect(Collectors.toList());
    }
}
