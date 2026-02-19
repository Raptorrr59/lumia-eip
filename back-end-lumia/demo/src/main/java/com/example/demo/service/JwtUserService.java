package com.example.demo.service;

import com.example.demo.entity.UsersEntity;
import com.example.demo.repository.UsersRepository;
import com.example.demo.security.JwtUtility;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class JwtUserService {

    @Autowired
    private UsersRepository usersRepository;

    public String extractUserIdFromToken(String token) throws Exception {
        if (token.startsWith("Bearer ")) {
            token = token.substring(7);
        }

        if (!JwtUtility.validateToken(token)) {
            throw new Exception("Invalid token");
        }

        String username = JwtUtility.extractUsername(token);
        Optional<UsersEntity> userOpt = usersRepository.findByUserName(username);

        if (userOpt.isEmpty()) {
            throw new Exception("User not found");
        }

        return userOpt.get().getUserId().toString();
    }

    public ObjectId extractUserObjectIdFromToken(String token) throws Exception {
        String userId = extractUserIdFromToken(token);
        return new ObjectId(userId);
    }

    public UsersEntity getUserFromToken(String token) throws Exception {
        if (token.startsWith("Bearer ")) {
            token = token.substring(7);
        }

        if (!JwtUtility.validateToken(token)) {
            throw new Exception("Invalid token");
        }

        String username = JwtUtility.extractUsername(token);
        Optional<UsersEntity> userOpt = usersRepository.findByUserName(username);

        if (userOpt.isEmpty()) {
            throw new Exception("User not found");
        }

        return userOpt.get();
    }
}