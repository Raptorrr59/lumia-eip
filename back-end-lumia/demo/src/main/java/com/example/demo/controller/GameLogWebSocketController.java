package com.example.demo.controller;

import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class GameLogWebSocketController {
    private final SimpMessagingTemplate messagingTemplate;

    public GameLogWebSocketController(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    public void sendMessage(String message) {
        messagingTemplate.convertAndSend("/topic/", message);
    }
}
