package com.example.demo.service;

import com.example.demo.entity.UserTokens;
import com.example.demo.repository.UserTokensRepository;
import org.springframework.stereotype.Service;

@Service
public class
UserTokensService {
    private final UserTokensRepository userTokensRepository;

    public UserTokensService(UserTokensRepository userTokensRepository) {
        this.userTokensRepository = userTokensRepository;
    }

    public void saveUserTokens(UserTokens userTokens) {
        userTokensRepository.save(userTokens);
    }
}
