package com.example.demo.controller;

import com.example.demo.security.JwtUtility;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RequestMapping("/api/")
@RestController
public class Verify {

    @GetMapping("/verify")
    public ResponseEntity<Map<String, Object>> verifyToken(HttpServletRequest request) {
        String header = request.getHeader("Authorization");
        Map<String, Object> response = new HashMap<>();

        if (header == null || !header.startsWith("Bearer ")) {
            response.put("valid", false);
            response.put("message", "Token absent ou mal formaté");
            return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
        }

        String token = header.replace("Bearer ", "");
        boolean isValid = JwtUtility.validateToken(token);

        response.put("valid", isValid);
        if (isValid) {
            String username = JwtUtility.extractUsername(token);
            response.put("username", username);
        } else {
            response.put("message", "Token invalid");
        }
        return ResponseEntity.ok(response);
    }
}
