package com.example.demo.entity;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;

import java.util.HashSet;
import java.util.Set;

@Document(collection = "users")
public class UsersEntity {

    @Id
    @JsonSerialize(using = ToStringSerializer.class)
    private ObjectId userId;  // Utilisation de String ou ObjectId pour l'ID MongoDB

    @Email
    private String email;
    private String password;
    private String userName;
    private boolean emailVerified = false;
    private Integer lumiaCoin = 100;
    private Boolean subscribed;
    private boolean isBanned = false;

    // Utilisation de DBRef pour les références à d'autres documents (roles ici)
    @DBRef(lazy = true)
    private Set<RoleEntity> roles = new HashSet<>();
    @DBRef(lazy = true)
    private Set<BadgeEntity> badges = new HashSet<>();

    // Getters et Setters
    public ObjectId getUserId() {
        return userId;
    }

    public void setUserId(ObjectId userId) {
        this.userId = userId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public Set<RoleEntity> getRoles() {
        return roles;
    }

    public void setRoles(Set<RoleEntity> roles) {
        this.roles = roles;
    }

    public Set<BadgeEntity> getBadges() {
        return badges;
    }

    public void setBadges(Set<BadgeEntity> badges) {
        this.badges = badges;
    }

    public boolean isEmailVerified() {
        return emailVerified;
    }

    public void setEmailVerified(boolean emailVerified) {
        this.emailVerified = emailVerified;
    }

    public Integer getLumiaCoin() {
        return lumiaCoin;
    }

    public void setLumiaCoin(Integer lumiaCoin) {
        this.lumiaCoin = lumiaCoin;
    }

    public Boolean getSubscribed() {
        return subscribed;
    }

    public void setSubscribed(Boolean subscribed) {
        this.subscribed = subscribed;
    }

    public Boolean isBanned() {
        return isBanned;
    }
    public void setIsBanned(Boolean isBanned) {
        this.isBanned = isBanned;
    }
}