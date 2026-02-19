
package com.example.demo.controller;

import com.example.demo.GameName;
import com.example.demo.entity.FileUploadEntity;
import com.example.demo.entity.UsersEntity;
import com.example.demo.repository.FileUploadRepository;
import com.example.demo.repository.UsersRepository;
import com.example.demo.service.FileUploadService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

@RequestMapping("/api/")
@RestController
public class FileUploadController {

    @Autowired
    private RestTemplate restTemplate;
    @Autowired
    private FileUploadRepository fileUploadRepository;
    @Autowired
    private FileUploadService fileUploadService;
    @Autowired
    private UsersRepository usersRepository;
    @Autowired
    private GameLogWebSocketController gameLogWebSocketController;

    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Map<String, Object>> uploadFile(
            @RequestParam("file") MultipartFile file,
            @RequestParam("game") String game,
            @RequestParam("isTraining") Boolean isTraining) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String username = authentication.getName();
            Optional<UsersEntity> userOpt = usersRepository.findByUserName(username);
            
            if (userOpt.isEmpty()) {
                Map<String, Object> errorResponse = new HashMap<>();
                errorResponse.put("error", "User not found");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
            }
            
            UsersEntity user = userOpt.get();
            ObjectId userIdObj = user.getUserId();

            try {
                GameName.valueOf(game.toUpperCase());
            } catch (IllegalArgumentException e) {
                throw new IllegalArgumentException("Invalid game name: " + game);
            }

            if (isTraining && GameName.valueOf(game.toUpperCase()) != GameName.IMAGE) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body(Map.of("error", "Le jeu ne contient pas d'entrainement"));
            }

            if (isTraining) {
                Optional<FileUploadEntity> existingTraining =
                        fileUploadRepository.findTopByUserIdAndGameAndIsTrainingTrueOrderByVersionDesc(userIdObj, game.toUpperCase());
                if (existingTraining.isPresent()) {
                    FileUploadEntity existing = existingTraining.get();
                    existing.setIsProcessed(false);
                    fileUploadRepository.save(existing);
                }
            }

            FileUploadEntity savedFile = fileUploadService.saveFile(file, userIdObj, game.toUpperCase(), isTraining);

            Map<String, Object> requestPayload = new HashMap<>();
            requestPayload.put("dockerId", savedFile.getDockerId());
            requestPayload.put("game", savedFile.getGame());
            requestPayload.put("userId", savedFile.getUserId().toString());
            requestPayload.put("isTraining", savedFile.getIsTraining());

            String newApiUrl = "http://host.docker.internal:8010/api/rundocker";
            ResponseEntity<String> newApiResponse = restTemplate.postForEntity(newApiUrl, requestPayload, String.class);

            Map<String, Object> response = new HashMap<>();
            response.put("message", "Fichier uploadé avec succès !");
            response.put("dockerId", savedFile.getDockerId());
            response.put("game", savedFile.getGame());
            response.put("isTraining", savedFile.getIsTraining());
            user.setLumiaCoin(user.getLumiaCoin() - 5);

            return ResponseEntity.ok(response);
        } catch (IOException e) {
            return ResponseEntity.internalServerError().body(Map.of("error", "Erreur lors de l'upload du fichier" + e.getMessage()));
        }
    }

    @PostMapping("/restartdocker")
    public ResponseEntity<?> restartDocker(@RequestParam Integer dockerId, @RequestParam String userId, @RequestParam GameName game) {
        try {
            if  (fileUploadRepository.findTopByDockerIdAndUserIdAndGameOrderByVersionDesc(dockerId, new ObjectId(userId), game.toString()).isPresent()) {
                String newApiUrl = "http://host.docker.internal:8010/api/restartdocker";
                Map<String, Object> requestPayload = new HashMap<>();
                requestPayload.put("dockerId", dockerId);
                requestPayload.put("game", game.toString());
                requestPayload.put("userId", userId);

                ResponseEntity<String> newApiResponse = restTemplate.postForEntity(newApiUrl, requestPayload, String.class);

                return ResponseEntity.ok("fichier relancé");
            }
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of("error", "Erreur lors du restart du fichier" + e.getMessage()));
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/docker/{dockerId}")
    public ResponseEntity<?> getFileByDockerId(@PathVariable Integer dockerId) {
        try {
            Optional<FileUploadEntity> fileEntity = fileUploadRepository.findByDockerId(dockerId);

            if (fileEntity.isPresent()) {
                return ResponseEntity.ok(fileEntity.get());
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(Map.of("error", "Aucun fichier trouvé avec le dockerId : " + dockerId));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Erreur lors de la récupération du fichier: " + e.getMessage()));
        }
    }

    @DeleteMapping("/delete/docker{dockerId}")
    public ResponseEntity<?> deleteFileByDockerId(@PathVariable Integer dockerId) {
        try {
            List<FileUploadEntity> fileEntity = fileUploadRepository.findAllByDockerId(dockerId);
            if (!fileEntity.isEmpty()) {

                FileUploadEntity savedFile = fileEntity.getFirst();

                Map<String, Object> requestPayload = new HashMap<>();
                requestPayload.put("dockerId", savedFile.getDockerId());
                requestPayload.put("game", savedFile.getGame());

                String newApiUrl = "http://host.docker.internal:8010/api/rundocker/" + savedFile.getDockerId();
                HttpHeaders headers = new HttpHeaders();
                headers.setContentType(MediaType.APPLICATION_JSON);
                HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestPayload, headers);
                ResponseEntity<String> newApiResponse = restTemplate.exchange(newApiUrl, HttpMethod.DELETE, entity, String.class);

                if (newApiResponse.getStatusCode() == HttpStatus.OK) {
                    fileUploadRepository.deleteAll(fileEntity);
                    return ResponseEntity.ok(Map.of("message", "Fichier supprimé avec succès."));
                } else {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                            .body(Map.of("error", "Échec de la suppression dans l'API externe."));
                }
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(Map.of("error", "Aucun fichier trouvé avec le dockerId : " + dockerId));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Erreur lors de la récupération du fichier: " + e.getMessage()));
        }
    }

    @PutMapping("/training/change-status")
    public ResponseEntity<?> changeStatus(@RequestParam Integer dockerId, @RequestParam String userId,
                                          @RequestParam GameName gameName, @RequestParam String status) {
        try {
            ObjectId id = new ObjectId(userId);
            Optional<FileUploadEntity> file = fileUploadRepository.findTopByUserIdAndDockerIdAndGameOrderByVersionDesc(id, dockerId, gameName.toString());
            if (file.isPresent()) {
                FileUploadEntity changeStatus = file.get();
                changeStatus.setIsProcessed(true);
                fileUploadRepository.save(changeStatus);
            }
            else {
                return ResponseEntity.noContent().build();
            }
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
        gameLogWebSocketController.sendMessage("Fichier entrainé -> userId: " + userId + " dockerId: " + dockerId);
        return ResponseEntity.ok(Map.of("status", status,
                "userId", userId ));
    }

    @GetMapping("/training/getfile")
    public ResponseEntity<ByteArrayResource> getFileByUserId(@RequestParam String userId, @RequestParam Integer dockerId,
                                                             @RequestParam GameName gameName) {
        try {
            Optional<FileUploadEntity> fileEntity = fileUploadRepository.findTopByUserIdAndDockerIdAndGameOrderByVersionDesc(new ObjectId(userId), dockerId, gameName.toString());

            if (fileEntity.isEmpty()) {
                return ResponseEntity.notFound().build();
            }

            FileUploadEntity savedFile = fileEntity.get();

            String apiUrl = String.format("http://host.docker.internal:8010/api/getfile?userId=%s&game=%s&dockerId=%d",
                    savedFile.getUserId().toString(), savedFile.getGame().toLowerCase(), savedFile.getDockerId());

            HttpHeaders headers = new HttpHeaders();
            headers.setAccept(List.of(MediaType.APPLICATION_OCTET_STREAM));

            HttpEntity<String> entity = new HttpEntity<>(headers);

            ResponseEntity<byte[]> vpsResponse = restTemplate.exchange(
                    apiUrl,
                    HttpMethod.GET,
                    entity,
                    byte[].class
            );

            if (vpsResponse.getStatusCode() != HttpStatus.OK || vpsResponse.getBody() == null) {
                return ResponseEntity.notFound().build();
            }

            ByteArrayResource resource = new ByteArrayResource(vpsResponse.getBody());

            String filename = userId + "_IMAGE";
            String contentType = "application/octet-stream";

            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(contentType))
                    .header(HttpHeaders.CONTENT_DISPOSITION,
                            "attachment; filename=\"" + filename + "\"")
                    .contentLength(resource.contentLength())
                    .body(resource);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/training/status")
    public ResponseEntity<Map<String, Object>> getTrainingStatus(
            @RequestParam("userId") String userId,
            @RequestParam("game") String game) {
        try {
            ObjectId userIdObj = new ObjectId(userId);

            Optional<FileUploadEntity> trainingFile =
                    fileUploadRepository.findTopByUserIdAndGameAndIsTrainingTrueOrderByVersionDesc(userIdObj, game.toUpperCase());

            if (trainingFile.isPresent()) {
                FileUploadEntity file = trainingFile.get();
                return ResponseEntity.ok(Map.of(
                        "trainingExists", true,
                        "isProcessed", file.getIsProcessed(),
                        "trainingId", file.getId().toString()
                ));
            } else {
                return ResponseEntity.ok(Map.of(
                        "trainingExists", false,
                        "trainingFinish", false
                ));
            }
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "UserId invalide"));
        }
    }
}