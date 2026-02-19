package com.example.demo.service;

import com.example.demo.RoleName;
import com.example.demo.entity.UsersEntity;
import com.example.demo.entity.dto.UpdatePasswordDTO;
import com.example.demo.repository.UsersRepository;
import com.example.demo.repository.CommentsRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Optional;

@Service
public class UsersService {
    private final UsersRepository usersRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    private CommentsRepository commentsRepository;

    @Autowired
    public UsersService(UsersRepository usersRepository, PasswordEncoder passwordEncoder) {
        this.usersRepository = usersRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public UsersEntity login(String email, String password) {
        Optional<UsersEntity> userOpt = usersRepository.findByEmail(email);
        if (userOpt.isEmpty()) {
            throw new RuntimeException("Email or password is incorrect");
        }
        
        UsersEntity user = userOpt.get();
        if (!passwordEncoder.matches(password, user.getPassword()) || !user.getEmail().equals(email)) {
            throw new RuntimeException("Email or password is incorrect");
        }
        return user;
    }

    public void banAnUserByEmail(String email) {
        Optional<UsersEntity> userOpt = usersRepository.findByEmail(email);
        
        if (userOpt.isEmpty()) {
            throw new RuntimeException("User not found");
        }
        
        UsersEntity user = userOpt.get();
        user.setIsBanned(true);
        usersRepository.save(user);
    }

    public void updatePassword(String userId, UpdatePasswordDTO updatePasswordDTO) {
        UsersEntity user = usersRepository.findById(new ObjectId(userId))
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

        if (!passwordEncoder.matches(updatePasswordDTO.getOldPassword(), user.getPassword())) {
            throw new RuntimeException("Ancien mot de passe incorrect");
        }

        user.setPassword(passwordEncoder.encode(updatePasswordDTO.getNewPassword()));
        usersRepository.save(user);
    }

    public boolean isAdmin(Authentication authentication) {
        String username = authentication.getName();
        Optional<UsersEntity> userOpt = usersRepository.findByUserName(username);
        if (userOpt.isEmpty()) {
            return false;
        }
        
        UsersEntity user = userOpt.get();
        return user.getRoles().stream().anyMatch(role -> role.getName().equals(RoleName.ADMIN));
    }

    public boolean deleteUserByUserName(String userName) {
        try {
            // 1. Trouver l'utilisateur par userName
            Optional<UsersEntity> userOpt = usersRepository.findByUserName(userName);

            if (!userOpt.isPresent()) {
                return false; // Utilisateur non trouvé
            }

            UsersEntity user = userOpt.get();
            String userId = user.getUserId().toString();

            commentsRepository.deleteByUserId(userId);

            user.setIsBanned(true);
            usersRepository.save(user);
            return true;

        } catch (Exception e) {
            throw new RuntimeException("Erreur lors de la suppression de l'utilisateur: " + e.getMessage());
        }
    }
}
