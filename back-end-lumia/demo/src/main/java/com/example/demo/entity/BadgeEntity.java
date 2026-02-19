package com.example.demo.entity;

import com.example.demo.BadgeName;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Objects;

@Document(collection = "badges")
public class BadgeEntity {

    @Id
    @JsonSerialize(using = ToStringSerializer.class)
    private ObjectId badgeId;
    private BadgeName badgeName;

    public ObjectId getBadgeId() {
        return badgeId;
    }
    public BadgeName getBadgeName() {
        return badgeName;
    }
    public void setBadgeName(BadgeName badgeName) {
        this.badgeName = badgeName;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        BadgeEntity that = (BadgeEntity) o;
        return Objects.equals(badgeId, that.badgeId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(badgeId);
    }
}
