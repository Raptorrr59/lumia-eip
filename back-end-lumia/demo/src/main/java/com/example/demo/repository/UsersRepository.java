package com.example.demo.repository;

import com.example.demo.entity.UsersEntity;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UsersRepository extends MongoRepository<UsersEntity, ObjectId> {
    Optional<UsersEntity> findByEmail(String email);
    Optional<UsersEntity> findByUserName(String username);
    Optional<UsersEntity> findByUserId(ObjectId id);
    List<UsersEntity> findAllBySubscribedIsTrue();
}
