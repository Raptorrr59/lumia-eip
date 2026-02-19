package com.example.demo.security;

import com.example.demo.entity.UsersEntity;
import com.example.demo.repository.UserTokensRepository;
import com.example.demo.repository.UsersRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import java.security.Principal;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Component
public class WebSocketAuthChannelInterceptor implements ChannelInterceptor {

    private static final Logger logger = LoggerFactory.getLogger(WebSocketAuthChannelInterceptor.class);

    private final UserTokensRepository userTokensRepository;
    private final UsersRepository usersRepository;

    public WebSocketAuthChannelInterceptor(UserTokensRepository userTokensRepository,
                                           UsersRepository usersRepository) {
        this.userTokensRepository = userTokensRepository;
        this.usersRepository = usersRepository;
    }

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        StompHeaderAccessor accessor = MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);

        if (accessor != null && StompCommand.CONNECT.equals(accessor.getCommand())) {
            logger.info("[WebSocket Auth] CONNECT frame received");
            // Extract Authorization header from STOMP headers
            List<String> authHeaders = accessor.getNativeHeader("Authorization");

            if (authHeaders != null && !authHeaders.isEmpty()) {
                String authHeader = authHeaders.get(0);
                String token = authHeader;

                // Remove "Bearer " prefix if present
                if (authHeader.startsWith("Bearer ")) {
                    token = authHeader.substring(7);
                }

                // Validate token and set principal
                if (JwtUtility.validateToken(token)) {
                    // Check if token exists in database
                    if (userTokensRepository.findByAccessToken(token).isPresent()) {
                        String username = JwtUtility.extractUsername(token);
                        logger.info("[WebSocket Auth] Token valid for username: {}", username);

                        // Get user ID from database
                        Optional<UsersEntity> userOpt = usersRepository.findByUserName(username);

                        if (userOpt.isPresent()) {
                            String userId = userOpt.get().getUserId().toString();
                            logger.info("[WebSocket Auth] Setting principal to userId: {}", userId);

                            // Create authentication with userId as principal name
                            // This allows us to send messages to specific users via their userId
                            UsernamePasswordAuthenticationToken auth =
                                new UsernamePasswordAuthenticationToken(
                                    userId,
                                    null,
                                    Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER"))
                                );

                            accessor.setUser(auth);
                            logger.info("[WebSocket Auth] Principal set successfully, auth.getName(): {}", auth.getName());
                        } else {
                            logger.warn("[WebSocket Auth] User not found for username: {}", username);
                        }
                    } else {
                        logger.warn("[WebSocket Auth] Token not found in database");
                    }
                } else {
                    logger.warn("[WebSocket Auth] Token validation failed");
                }
            } else {
                logger.warn("[WebSocket Auth] No Authorization header found");
            }
        }

        return message;
    }
}
