package com.example.demo.entity;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Document(collection = "game_logs")
public class GameLogEntity {
    @Id
    private ObjectId gameLogId;

    private String timeStamp;
    private String gameType;
    private String logLevel;
    private String message;
    private String userId;
    private Integer gameId;
    private List<GameStatesEntity> gameStates;

    public ObjectId getId() {
        return gameLogId;
    }
    public void setId(ObjectId gameLogId) {
        this.gameLogId = gameLogId;
    }

    public String getTimestamp() { return timeStamp; }
    public void setTimestamp(String timeStamp) { this.timeStamp = timeStamp; }

    public String getGameType() { return gameType; }
    public void setGameType(String gameType) { this.gameType = gameType; }

    public String getLogLevel() { return logLevel; }
    public void setLogLevel(String logLevel) { this.logLevel = logLevel; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public int getGameId() { return gameId; }
    public void setGameId(int gameId) { this.gameId = gameId; }

    public List<GameStatesEntity> getGameStates() { return gameStates; }
    public void setGameStates(List<GameStatesEntity> gameStates) { this.gameStates = gameStates; }
}

