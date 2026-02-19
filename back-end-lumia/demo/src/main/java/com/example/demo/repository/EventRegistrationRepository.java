package com.example.demo.repository;

import com.example.demo.EventName;
import com.example.demo.entity.EventRegistrationEntity;
import com.example.demo.entity.dto.EventCountDTO;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import org.bson.types.ObjectId;

import java.util.List;

@Repository
public interface EventRegistrationRepository extends MongoRepository<EventRegistrationEntity, ObjectId> {
    boolean existsByEventTitleAndUserEmail(EventName eventTitle, String userEmail);
    long countByEventTitle(EventName eventTitle);
    long deleteByEventTitleAndUserEmail(EventName eventTitle, String userEmail);

    @Aggregation(pipeline = {
            "{ '$group': { '_id': { '$ifNull': [ '$event_title', '$eventTitle' ] }, 'count': { '$sum': 1 } } }",
            "{ '$project': { 'eventName': '$_id', 'count': 1, '_id': 0 } }",
            "{ '$sort': { 'count': -1 } }"
    })
    List<EventCountDTO> countTotalRegistrationsByEvent();
}