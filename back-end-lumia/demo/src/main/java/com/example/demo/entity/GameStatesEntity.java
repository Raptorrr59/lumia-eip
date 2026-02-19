package com.example.demo.entity;

import com.fasterxml.jackson.annotation.JsonAnySetter;

import java.util.HashMap;
import java.util.Map;

public class GameStatesEntity {
    private String timestamp;
    private String itemType;
    private Map<String, Object> properties = new HashMap<>(); // Peut contenir message, logType, position...

    public String getTimestamp() { return timestamp; }
    public void setTimestamp(String timestamp) { this.timestamp = timestamp; }

    public String getItemType() { return itemType; }
    public void setItemType(String itemType) { this.itemType = itemType; }

    public Map<String, Object> getProperties() { return properties; }
    public void setProperties(Map<String, Object> properties) { this.properties = properties; }

    @JsonAnySetter
    public void setProperty(String name, Object value) {
        properties.put(name, value);
    }
    public boolean isEmpty() {
        return (properties == null || properties.isEmpty());
    }
}