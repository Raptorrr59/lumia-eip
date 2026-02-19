package com.example.demo.exeption;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.CONFLICT)
public class BadgeAlreadyOwnedException extends RuntimeException {
    public BadgeAlreadyOwnedException(String message) {
        super(message);
    }
}
