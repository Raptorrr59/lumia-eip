package com.example.demo.repository;

import com.example.demo.EventName;
import com.example.demo.entity.EventNamesEntity;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EventNamesRepository extends MongoRepository<EventNamesEntity,String> {
    Optional<EventNamesEntity> findByEventName(EventName eventName);

}
