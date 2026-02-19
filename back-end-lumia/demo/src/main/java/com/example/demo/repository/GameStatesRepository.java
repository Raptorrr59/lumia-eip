package com.example.demo.repository;

import com.example.demo.entity.GameStatesEntity;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface GameStatesRepository extends MongoRepository<GameStatesEntity, ObjectId> {
}
