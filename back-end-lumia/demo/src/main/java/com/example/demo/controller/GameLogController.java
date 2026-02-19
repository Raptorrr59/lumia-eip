package com.example.demo.controller;

import com.example.demo.GameName;
import com.example.demo.entity.FileUploadEntity;
import com.example.demo.entity.GameStatesEntity;
import com.example.demo.repository.FileUploadRepository;
import com.example.demo.repository.UsersRepository;
import com.example.demo.service.GameLogService;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.example.demo.entity.GameLogEntity;
import com.example.demo.repository.GameLogRepository;
import io.micrometer.common.util.StringUtils;
import jakarta.servlet.http.HttpServletResponse;
import org.bson.json.JsonParseException;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.task.SimpleAsyncTaskExecutor;
import org.springframework.core.task.TaskExecutor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.task.DelegatingSecurityContextTaskExecutor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.*;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/game")
public class GameLogController {

    @Autowired
    private GameLogRepository gameLogRepository;
    @Autowired
    private GameLogWebSocketController gameLogWebSocketController;
    @Autowired
    private UsersRepository usersRepository;
    @Autowired
    private FileUploadRepository fileUploadRepository;
    @Autowired
    private GameLogService gameLogService;

    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> uploadGameLog(@RequestParam("file") MultipartFile file, @RequestParam("userId") String userId, @RequestParam("game") String game) {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("Le fichier est vide");
        }
        if (StringUtils.isBlank(userId) || StringUtils.isBlank(game)) {
            return ResponseEntity.badRequest().body("UserId et game sont requis");
        }
        try {
            ObjectId checkUser;
            try {
                checkUser = new ObjectId(userId);
            } catch (IllegalArgumentException e) {
                return ResponseEntity.badRequest().body("UserId invalide");
            }

            if (usersRepository.findByUserId(checkUser).isEmpty()) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Utilisateur non autorisé");
            }

            gameLogRepository.deleteByUserIdAndGameType(userId, game);

            ObjectMapper objectMapper = new ObjectMapper();
            objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, true);

            GameLogEntity games;
            try (InputStream inputStream = file.getInputStream()) {
                games = objectMapper.readValue(inputStream, GameLogEntity.class);
            } catch (JsonParseException | JsonMappingException e) {
                return ResponseEntity.badRequest().body("Format de fichier JSON invalide : " + e.getMessage());
            }

            gameLogRepository.save(games);

            gameLogWebSocketController.sendMessage("Nouveau fichier -> userId: " + games.getUserId() + " gameType: " + games.getGameType());
            return ResponseEntity.ok("Log de jeu téléchargé avec succès");

        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Échec du téléchargement du log de jeu : " + e.getMessage());
        }
    }

    @GetMapping("/game-log")
    public ResponseEntity<?> getGameLog(@RequestParam("userId") String userId,
                                        @RequestParam("gameType") String gameType) {
        try {
            GameName.valueOf(gameType.toUpperCase());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Invalid game type: " + gameType);
        }

        Optional<GameLogEntity> log = Optional.ofNullable(gameLogRepository.findByUserIdAndGameType(
                userId, gameType.toLowerCase()
        ));
        return log.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping(value = "/stream", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter streamGameStates(@RequestParam("userId") String userId, @RequestParam("gameType") String gameType) {
        SseEmitter emitter = new SseEmitter(300000L); // 5 minutes timeout

        try {
            GameName.valueOf(gameType.toUpperCase());
        } catch (IllegalArgumentException e) {
            emitter.completeWithError(new IllegalArgumentException("Invalid game Type: " + gameType));
            return emitter;
        }

        GameLogEntity gameLog = gameLogRepository.findByUserIdAndGameType(userId, gameType.toLowerCase());

        if (gameLog == null || gameLog.getGameStates() == null || gameLog.getGameStates().isEmpty()) {
            try {
                emitter.send(SseEmitter.event().name("message").data("Aucun log ou état de jeu trouvé"));
                emitter.complete();
            } catch (IOException e) {
                emitter.completeWithError(e);
            }
            return emitter;
        }

        List<GameStatesEntity> gameStates = new ArrayList<>(gameLog.getGameStates());

        final AtomicInteger index = new AtomicInteger(0);

        SecurityContext securityContext = SecurityContextHolder.getContext();

        TaskExecutor taskExecutor = new DelegatingSecurityContextTaskExecutor(
                new SimpleAsyncTaskExecutor("game-state-emitter-"),
                securityContext
        );

        emitter.onCompletion(SecurityContextHolder::clearContext);
        emitter.onTimeout(() -> {
            SecurityContextHolder.clearContext();
            emitter.complete();
        });
        emitter.onError((ex) -> {
            SecurityContextHolder.clearContext();
            emitter.completeWithError(ex);
        });

        // Envoi de l'état initial AVANT la boucle
        try {
            emitter.send(SseEmitter.event()
                    .name("initialPosition")
                    .data(gameStates.getFirst())
                    .id("init"));
        } catch (IOException e) {
            emitter.completeWithError(e);
            return emitter;
        }

        Runnable emitterTask = new Runnable() {
        @Override
        public void run() {
            SecurityContextHolder.setContext(securityContext);

            int currentIndex = index.getAndIncrement();

            // Commencer à 1 pour éviter d'envoyer deux fois l'état initial
            if (currentIndex < gameStates.size()) {
                try {
                    if (currentIndex == 0) {
                        currentIndex++; // On skip l'état 0 qui a été envoyé comme "initialPosition"
                    }

                    if (currentIndex < gameStates.size()) {
                        GameStatesEntity gameState = gameStates.get(currentIndex);

                        Thread.sleep(100); // Simulation de délai

                        if (gameState != null && !gameState.isEmpty()) {
                            emitter.send(SseEmitter.event()
                                    .name("gameState")
                                    .data(gameState)
                                    .id(String.valueOf(currentIndex)));
                        }

                        // CORRECTION: Vérifier si c'est le dernier état
                        if (currentIndex + 1 >= gameStates.size()) {
                            // C'était le dernier état, envoyer le message de fin
                            emitter.send(SseEmitter.event().name("complete").data("Tous les états ont été envoyés"));
                            emitter.complete();
                        } else {
                            // Il reste des états, continuer
                            taskExecutor.execute(this);
                        }
                    } else {
                        // currentIndex >= gameStates.size(), envoyer le message de fin
                        emitter.send(SseEmitter.event().name("complete").data("Tous les états ont été envoyés"));
                        emitter.complete();
                    }
                } catch (IOException | InterruptedException e) {
                    emitter.completeWithError(e);
                    Thread.currentThread().interrupt();
                } finally {
                    SecurityContextHolder.clearContext();
                }
            } else {
                // currentIndex >= gameStates.size() dès le début, envoyer le message de fin
                try {
                    emitter.send(SseEmitter.event().name("complete").data("Tous les états ont été envoyés"));
                    emitter.complete();
                } catch (IOException e) {
                    emitter.completeWithError(e);
                } finally {
                    SecurityContextHolder.clearContext();
                }
            }
        }
    };

        taskExecutor.execute(emitterTask);
        return emitter;
    }

    @PostMapping("/training/complete")
    public ResponseEntity<Map<String, Object>> markTrainingComplete(
            @RequestParam("userId") String userId,
            @RequestParam("game") String game) {
        try {
            ObjectId userIdObj = new ObjectId(userId);

            if (usersRepository.findByUserId(userIdObj).isEmpty()) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of("error", "Utilisateur non autorisé"));
            }

            Optional<FileUploadEntity> trainingFile = fileUploadRepository
                    .findTopByUserIdAndGameAndIsTrainingTrueOrderByVersionDesc(userIdObj, game.toUpperCase());

            if (trainingFile.isPresent()) {
                FileUploadEntity file = trainingFile.get();
                file.setIsProcessed(true);
                fileUploadRepository.save(file);

                // Notification WebSocket au front
                Map<String, Object> notification = new HashMap<>();
                notification.put("userId", userId);
                notification.put("game", game);
                notification.put("status", "training_completed");
                notification.put("message", "Entraînement terminé pour " + game);

                gameLogWebSocketController.sendMessage(notification.toString());

                return ResponseEntity.ok(Map.of(
                        "message", "Entraînement marqué comme terminé",
                        "trainingId", file.getId().toString()
                ));
            } else {
                return ResponseEntity.badRequest()
                        .body(Map.of("error", "Aucun entraînement en cours trouvé"));
            }

        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "UserId invalide"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Erreur lors de la mise à jour"));
        }
    }

    @GetMapping("/download")
    public ResponseEntity<ByteArrayResource> downloadGameLogs(
            @RequestParam String userId,
            @RequestParam String gameType,
            HttpServletResponse response) {

        try {
            GameLogEntity gameLog = gameLogService.findByUserIdAndGame(userId, gameType);

            if (gameLog == null) {
                return ResponseEntity.notFound().build();
            }

            ObjectMapper objectMapper = new ObjectMapper();
            String jsonContent = objectMapper.writeValueAsString(gameLog);

            String fileName = String.format("game_logs_%s_game_%s.json", userId, gameType);

            ByteArrayResource resource = new ByteArrayResource(jsonContent.getBytes(StandardCharsets.UTF_8));

            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileName + "\"")
                    .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                    .header(HttpHeaders.CONTENT_LENGTH, String.valueOf(resource.contentLength()))
                    .body(resource);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/log-files")
    public List<String> getLogFiles(@RequestParam String userId) {
        return gameLogRepository.findByUserId(userId)
                .stream()
                .map(GameLogEntity::getGameType)
                .distinct()
                .collect(Collectors.toList());
    }
}