package com.example.demo;

public enum RoleName {
    USER, // can only get / post is the basic routes
    STAFF, // can get / post for him + Only Get for the others
    ADMIN // Have all access
}
