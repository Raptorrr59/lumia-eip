package com.example.demo.entity;

import com.example.demo.EventName;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "event_registrations")
public class EventRegistrationEntity {
    @Id
    @JsonSerialize(using = ToStringSerializer.class)
    private ObjectId eventId;

    private String userEmail;
    private String userName;
    private LocalDateTime registrationDate;
    private EventName eventTitle;

    public EventRegistrationEntity() {}
    
    public EventRegistrationEntity(String userEmail, String userName, EventName eventTitle) {
        this.userEmail = userEmail;
        this.userName = userName;
        this.eventTitle = eventTitle;
        this.registrationDate = LocalDateTime.now();
    }
    
    // Getters et Setters
    public ObjectId getId() { return eventId; }
    public void setId(ObjectId id) { this.eventId = id; }
    
    public String getUserEmail() { return userEmail; }
    public void setUserEmail(String userEmail) { this.userEmail = userEmail; }
    
    public String getUserName() { return userName; }
    public void setUserName(String userName) { this.userName = userName; }
    
    public LocalDateTime getRegistrationDate() { return registrationDate; }
    public void setRegistrationDate(LocalDateTime registrationDate) { this.registrationDate = registrationDate; }
    
    public EventName getEventTitle() { return eventTitle; }
    public void setEventTitle(EventName eventTitle) { this.eventTitle = eventTitle; }
}