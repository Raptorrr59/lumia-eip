package com.example.demo.controller;

import com.example.demo.entity.MessageEntity;
import com.example.demo.service.MessageService;
import org.bson.types.ObjectId;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.stereotype.Controller;

import java.security.Principal;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.messaging.simp.user.SimpUserRegistry;

@Controller
public class WebSocketMessageController {

    private static final Logger logger = LoggerFactory.getLogger(WebSocketMessageController.class);

    @Autowired
    private MessageService messageService;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @Autowired
    private SimpUserRegistry simpUserRegistry;

    @MessageMapping("/chat/send")
    public void sendMessage(@Payload Map<String, String> messageData, Principal principal) {
        try {
            String senderId = principal.getName();
            String receiverId = messageData.get("receiverId");
            String content = messageData.get("content");
            String messageTypeStr = messageData.get("messageType");

            logger.info("[WebSocket] Message received - senderId: {}, receiverId: {}, content length: {}",
                senderId, receiverId, content != null ? content.length() : 0);

            // Log all currently connected users
            String connectedUsers = simpUserRegistry.getUsers().stream()
                .map(user -> user.getName())
                .collect(Collectors.joining(", "));
            logger.info("[WebSocket] Currently connected users: [{}]", connectedUsers);
            logger.info("[WebSocket] Total connected users: {}", simpUserRegistry.getUserCount());

            // Check if receiver is connected
            boolean receiverConnected = simpUserRegistry.getUser(receiverId) != null;
            logger.info("[WebSocket] Is receiver {} connected? {}", receiverId, receiverConnected);

            if (receiverId == null || content == null) {
                logger.warn("[WebSocket] Missing receiverId or content");
                return;
            }

            MessageEntity.MessageType messageType = MessageEntity.MessageType.TEXT;
            if (messageTypeStr != null && !messageTypeStr.isEmpty()) {
                try {
                    messageType = MessageEntity.MessageType.valueOf(messageTypeStr.toUpperCase());
                } catch (IllegalArgumentException e) {
                    messageType = MessageEntity.MessageType.TEXT;
                }
            }

            MessageEntity message = messageService.sendMessage(
                new ObjectId(senderId),
                new ObjectId(receiverId),
                content,
                messageType
            );

            logger.info("[WebSocket] Message saved to DB with id: {}", message.getId());

            // Build a clean DTO for the message to ensure proper serialization
            Map<String, Object> messageDto = new HashMap<>();
            messageDto.put("id", message.getId() != null ? message.getId().toString() : null);
            messageDto.put("senderId", senderId);
            messageDto.put("receiverId", receiverId);
            messageDto.put("content", message.getContent());
            messageDto.put("messageType", message.getMessageType().toString());
            messageDto.put("sentAt", message.getSentAt() != null ? message.getSentAt().toString() : null);
            messageDto.put("read", message.isRead());

            // Send message to receiver using both methods for reliability
            logger.info("[WebSocket] Sending message to receiver: {} via /queue/messages", receiverId);

            // Method 1: convertAndSendToUser (requires user to be in SimpUserRegistry)
            messagingTemplate.convertAndSendToUser(
                receiverId,
                "/queue/messages",
                messageDto
            );

            // Method 2: Direct topic with userId (more reliable)
            logger.info("[WebSocket] Also sending to /topic/messages/{}", receiverId);
            messagingTemplate.convertAndSend(
                "/topic/messages/" + receiverId,
                messageDto
            );

            // Send confirmation to sender
            logger.info("[WebSocket] Sending confirmation to sender: {} via /queue/messages/sent", senderId);
            messagingTemplate.convertAndSendToUser(
                senderId,
                "/queue/messages/sent",
                messageDto
            );
            messagingTemplate.convertAndSend(
                "/topic/messages/sent/" + senderId,
                messageDto
            );

            // Broadcast updated unread count to receiver
            long unreadCount = messageService.getUnreadMessageCount(new ObjectId(receiverId));
            logger.info("[WebSocket] Sending unread count to receiver: {}, count: {}", receiverId, unreadCount);
            messagingTemplate.convertAndSendToUser(
                receiverId,
                "/queue/unread-count",
                Map.of("unreadCount", unreadCount)
            );
            messagingTemplate.convertAndSend(
                "/topic/unread/" + receiverId,
                Map.of("unreadCount", unreadCount)
            );

        } catch (Exception e) {
            logger.error("[WebSocket] Error sending message: {}", e.getMessage(), e);
            // Send error to sender
            messagingTemplate.convertAndSendToUser(
                principal.getName(),
                "/queue/errors",
                Map.of("error", e.getMessage() != null ? e.getMessage() : "Unknown error")
            );
        }
    }

    @MessageMapping("/chat/typing")
    public void handleTypingIndicator(@Payload Map<String, String> typingData, Principal principal) {
        String senderId = principal.getName();
        String receiverId = typingData.get("receiverId");
        String isTyping = typingData.get("isTyping");

        if (receiverId != null) {
            messagingTemplate.convertAndSendToUser(
                receiverId,
                "/queue/typing",
                Map.of(
                    "senderId", senderId,
                    "isTyping", Boolean.parseBoolean(isTyping)
                )
            );
        }
    }

    @MessageMapping("/chat/mark-read")
    public void markMessagesAsRead(@Payload Map<String, String> readData, Principal principal) {
        try {
            String userId = principal.getName();
            String partnerId = readData.get("partnerId");

            if (partnerId != null) {
                messageService.markMessagesAsRead(
                    new ObjectId(partnerId),
                    new ObjectId(userId)
                );

                // Notify the partner that their messages were read
                messagingTemplate.convertAndSendToUser(
                    partnerId,
                    "/queue/messages/read",
                    Map.of("readBy", userId)
                );

                // Update unread count for the user who read the messages
                long unreadCount = messageService.getUnreadMessageCount(new ObjectId(userId));
                messagingTemplate.convertAndSendToUser(
                    userId,
                    "/queue/unread-count",
                    Map.of("unreadCount", unreadCount)
                );
            }
        } catch (Exception e) {
            messagingTemplate.convertAndSendToUser(
                principal.getName(),
                "/queue/errors",
                Map.of("error", e.getMessage())
            );
        }
    }
}