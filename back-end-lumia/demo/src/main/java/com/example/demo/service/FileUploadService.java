
package com.example.demo.service;

import com.example.demo.entity.FileUploadEntity;
import com.example.demo.repository.FileUploadRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Paths;
import java.util.Date;
import java.util.Optional;

@Service
public class FileUploadService {

    private static final String UPLOAD_DIR = "/uploads"; // remplacer par le path ubuntu

    @Autowired
    private FileUploadRepository fileUploadRepository;

    public FileUploadEntity saveFile(MultipartFile file, ObjectId userId, String game, Boolean isTrain) throws IOException {
        // Vérifier et créer le dossier si nécessaire
        File uploadDir = new File(UPLOAD_DIR);
        if (!uploadDir.exists()) {
            uploadDir.mkdirs();
        }

        int dockerId = 1; // Par défaut
        int version = 1;

        Optional<FileUploadEntity> existingFile = fileUploadRepository.findTopByUserIdAndGameOrderByDateDesc(userId, game);

        if (existingFile.isPresent()) {
           dockerId = existingFile.get().getDockerId();
           version = existingFile.get().getVersion() + 1;
        } else {
            Optional<FileUploadEntity> lastFile = fileUploadRepository.findTopByOrderByDockerIdDesc();
            if (lastFile.isPresent()) {
                dockerId = lastFile.get().getDockerId() + 1;
            }
        }
        // Construire le chemin du fichier
        String filePath = Paths.get(UPLOAD_DIR, file.getOriginalFilename()).toString();
        File destFile = new File(filePath);
        file.transferTo(destFile);

        // Enregistrer en base de données
        FileUploadEntity newFile = new FileUploadEntity();
        newFile.setId(new ObjectId());
        newFile.setUserId(userId);
        newFile.setDockerId(dockerId);
        newFile.setVersion(version);
        newFile.setDate(new Date());
        newFile.setGame(game);
        newFile.setIsTraining(isTrain);

        return fileUploadRepository.save(newFile);
    }
}
