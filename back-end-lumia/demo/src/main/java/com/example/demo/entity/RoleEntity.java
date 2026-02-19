package com.example.demo.entity;

import com.example.demo.RoleName;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "roles")
public class RoleEntity {

    @Id
    @JsonSerialize(using = ToStringSerializer.class)
    private ObjectId roleId;  // Utilisation de String ou ObjectId pour l'ID MongoDB

    private RoleName name;

    public RoleEntity() {}

    // Getters et setters
    public ObjectId getRoleId() { return roleId; }

    public RoleName getName() { return name; }

    public void setName(RoleName name) { this.name = name; }
}
