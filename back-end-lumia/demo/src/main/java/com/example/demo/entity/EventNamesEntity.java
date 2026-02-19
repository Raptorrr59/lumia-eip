package com.example.demo.entity;

import com.example.demo.EventName;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "events_name")
public class EventNamesEntity {
    @Id
    @JsonSerialize(using = ToStringSerializer.class)
    private ObjectId eventsId;

    private EventName eventName;

    public EventNamesEntity() {}

    // Getters et setters
    public ObjectId getEventsId() { return eventsId; }

    public EventName getEventName() { return eventName; }

    public void setEventsName(EventName eventName) { this.eventName = eventName; }
}
