package com.example.demo.repository;

import com.example.demo.BadgeName;
import com.example.demo.entity.BadgeEntity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BadgeRepository extends MongoRepository<BadgeEntity, Integer> {
    Optional<BadgeEntity> findByBadgeName(BadgeName badgeName);
}
