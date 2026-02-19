package com.example.demo.controller;

import com.example.demo.entity.MessageEntity;
import com.example.demo.service.MessageService;
import com.example.demo.service.JwtUserService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/messages")
@CrossOrigin(origins = "*")
public class MessageController {

    @Autowired
    private MessageService messageService;

    @Autowired
    private JwtUserService jwtUserService;

    @PostMapping("/send")
    public ResponseEntity<?> sendMessage(@RequestHeader("Authorization") String token,
                                         @RequestBody Map<String, String> request) {
        try {
            String senderId = extractUserIdFromToken(token);
            String receiverId = request.get("receiverId");
            String content = request.get("content");
            String messageTypeStr = request.get("messageType");

            if (receiverId == null || receiverId.isEmpty()) {
                return ResponseEntity.badRequest().body("Receiver ID is required");
            }

            if (content == null || content.trim().isEmpty()) {
                return ResponseEntity.badRequest().body("Message content is required");
            }

            MessageEntity.MessageType messageType = MessageEntity.MessageType.TEXT;
            if (messageTypeStr != null && !messageTypeStr.isEmpty()) {
                try {
                    messageType = MessageEntity.MessageType.valueOf(messageTypeStr.toUpperCase());
                } catch (IllegalArgumentException e) {
                    return ResponseEntity.badRequest().body("Invalid message type");
                }
            }

            MessageEntity message = messageService.sendMessage(
                new ObjectId(senderId),
                new ObjectId(receiverId),
                content,
                messageType
            );

            return ResponseEntity.ok(message);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/conversation/{partnerId}")
    public ResponseEntity<?> getConversation(@RequestHeader("Authorization") String token,
                                             @PathVariable String partnerId,
                                             @RequestParam(defaultValue = "0") int page,
                                             @RequestParam(defaultValue = "20") int size) {
        try {
            String userId = extractUserIdFromToken(token);

            Page<MessageEntity> messages = messageService.getMessagesBetweenUsers(
                new ObjectId(userId),
                new ObjectId(partnerId),
                page,
                size
            );

            return ResponseEntity.ok(messages);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/unread")
    public ResponseEntity<?> getUnreadMessages(@RequestHeader("Authorization") String token) {
        try {
            String userId = extractUserIdFromToken(token);
            List<MessageEntity> unreadMessages = messageService.getUnreadMessages(new ObjectId(userId));
            return ResponseEntity.ok(unreadMessages);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/unread/count")
    public ResponseEntity<?> getUnreadMessageCount(@RequestHeader("Authorization") String token) {
        try {
            String userId = extractUserIdFromToken(token);
            long count = messageService.getUnreadMessageCount(new ObjectId(userId));
            return ResponseEntity.ok(Map.of("unreadCount", count));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/mark-read/{partnerId}")
    public ResponseEntity<?> markMessagesAsRead(@RequestHeader("Authorization") String token,
                                                @PathVariable String partnerId) {
        try {
            String userId = extractUserIdFromToken(token);

            messageService.markMessagesAsRead(
                new ObjectId(partnerId), // sender
                new ObjectId(userId)     // receiver (current user)
            );

            return ResponseEntity.ok("Messages marked as read");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{messageId}")
    public ResponseEntity<?> deleteMessage(@RequestHeader("Authorization") String token,
                                           @PathVariable String messageId) {
        try {
            String userId = extractUserIdFromToken(token);

            messageService.deleteMessage(
                new ObjectId(messageId),
                new ObjectId(userId)
            );

            return ResponseEntity.ok("Message deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/conversations")
    public ResponseEntity<?> getConversations(@RequestHeader("Authorization") String token) {
        try {
            String userId = extractUserIdFromToken(token);
            Map<String, Object> conversations = messageService.getConversations(new ObjectId(userId));
            return ResponseEntity.ok(conversations);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    private String extractUserIdFromToken(String token) throws Exception {
        return jwtUserService.extractUserIdFromToken(token);
    }
}