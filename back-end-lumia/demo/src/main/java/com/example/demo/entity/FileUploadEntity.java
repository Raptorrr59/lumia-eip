package com.example.demo.entity;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document(collection = "files")
public class FileUploadEntity {

    @Id
    private ObjectId id;
    @JsonSerialize(using = ToStringSerializer.class)
    private ObjectId userId;
    private Integer dockerId;
    private String game;
    private Integer version;
    private Date date;
    private Boolean isTraining;
    private Boolean isProcessed = false;

    public ObjectId getId() {
        return id;
    }

    public void setId(ObjectId id) {
        this.id = id;
    }

    public ObjectId getUserId() {
        return userId;
    }

    public void setUserId(ObjectId userId) {
        this.userId = userId;
    }

    public Integer getDockerId() {
        return dockerId;
    }

    public void setDockerId(Integer dockerId) {
        this.dockerId = dockerId;
    }

    public String getGame() {
        return game;
    }

    public void setGame(String game) {
        this.game = game;
    }

    public Integer getVersion() {
        return version;
    }

    public void setVersion(Integer version) {
        this.version = version;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Boolean getIsTraining() {
        return isTraining;
    }

    public void setIsTraining(Boolean isTraining) {
        this.isTraining = isTraining;
    }

    public Boolean getIsProcessed() {
        return isProcessed;
    }
    public void setIsProcessed(Boolean isProcessed) {
        this.isProcessed = isProcessed;
    }
}
