package com.example.demo.repository;

import com.example.demo.GameName;
import com.example.demo.entity.FileUploadEntity;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;
import java.util.Optional;

public interface FileUploadRepository extends MongoRepository<FileUploadEntity, ObjectId> {
    @Query(sort = "{ dockerId : -1 }")
    Optional<FileUploadEntity> findTopByOrderByDockerIdDesc();
    Optional<FileUploadEntity> findTopByDockerIdOrderByVersionDesc(Integer dockerId);
    List<FileUploadEntity> findAllByDockerId(Integer dockerId);
    Optional<FileUploadEntity> findByDockerId(Integer dockerId);
    Optional<FileUploadEntity> findByDockerIdAndGame(Integer dockerId, String game);
    Optional<FileUploadEntity> findTopByDockerIdAndUserIdAndGameOrderByVersionDesc(Integer dockerId, ObjectId userId, String game);
    Optional<FileUploadEntity> findByUserIdAndGame(ObjectId userId, String game);
    FileUploadEntity deleteByDockerId(Integer dockerId);
    Optional<FileUploadEntity> findTopByUserIdAndGameOrderByDateDesc(ObjectId userId, String game);
    Optional<FileUploadEntity> findTopByUserIdAndGameAndIsTrainingTrueOrderByVersionDesc(
            ObjectId userId, String game);

    Optional<FileUploadEntity> findTopByUserIdAndDockerIdAndGameOrderByVersionDesc(ObjectId userId, Integer dockerId, String game);

    Optional<FileUploadEntity> findByUserIdAndDockerId(ObjectId userId, Integer dockerId);
}
