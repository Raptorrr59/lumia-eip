package com.example.demo.service;

import com.example.demo.BadgeName;
import com.example.demo.entity.BadgeEntity;
import com.example.demo.entity.UsersEntity;
import com.example.demo.exeption.BadgeAlreadyOwnedException;
import com.example.demo.repository.BadgeRepository;
import com.example.demo.repository.UsersRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;

@Service
public class BadgesService {
    private final UsersRepository usersRepository;
    private final BadgeRepository badgeRepository;

    @Autowired
    public BadgesService(UsersRepository usersRepository, BadgeRepository badgeRepository) {
        this.usersRepository = usersRepository;
        this.badgeRepository = badgeRepository;
    }

    public Set<BadgeEntity> getUserBadges(String userId) {
        UsersEntity user = usersRepository.findById(new ObjectId(userId))
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));

        return user.getBadges();
    }

    @Transactional
    public UsersEntity addBadgeToUser(String userId, BadgeName badgeName) throws BadgeAlreadyOwnedException {
        UsersEntity user = usersRepository.findById(new ObjectId(userId))
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));

        BadgeEntity badge = badgeRepository.findByBadgeName(badgeName)
                .orElseThrow(() -> new RuntimeException("Badge not found with id: " + badgeName));

        boolean added = user.getBadges().add(badge);
        if (!added) {
            throw new BadgeAlreadyOwnedException("User with id " + userId + " already has the badge " + badgeName);
        }

        return usersRepository.save(user);
    }
}
