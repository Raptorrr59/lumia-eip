package com.example.demo.service;

import com.example.demo.entity.MessageEntity;
import com.example.demo.entity.UsersEntity;
import com.example.demo.repository.MessageRepository;
import com.example.demo.repository.UsersRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class MessageService {

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private UsersRepository usersRepository;

    @Autowired
    private FriendshipService friendshipService;

    public MessageEntity sendMessage(ObjectId senderId, ObjectId receiverId, String content, MessageEntity.MessageType messageType) throws Exception {
        if (!friendshipService.areFriends(senderId, receiverId)) {
            throw new Exception("You can only send messages to friends");
        }

        Optional<UsersEntity> sender = usersRepository.findById(senderId);
        Optional<UsersEntity> receiver = usersRepository.findById(receiverId);

        if (sender.isEmpty() || receiver.isEmpty()) {
            throw new Exception("User not found");
        }

        if (content == null || content.trim().isEmpty()) {
            throw new Exception("Message content cannot be empty");
        }

        MessageEntity message = new MessageEntity(sender.get(), receiver.get(), content.trim(), messageType);
        return messageRepository.save(message);
    }

    public Page<MessageEntity> getMessagesBetweenUsers(ObjectId user1Id, ObjectId user2Id, int page, int size) throws Exception {
        if (!friendshipService.areFriends(user1Id, user2Id)) {
            throw new Exception("You can only view messages with friends");
        }

        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "sentAt"));
        return messageRepository.findMessagesBetweenUsers(user1Id, user2Id, pageable);
    }

    public List<MessageEntity> getUnreadMessages(ObjectId userId) {
        return messageRepository.findUnreadMessagesForUser(userId);
    }

    public long getUnreadMessageCount(ObjectId userId) {
        return messageRepository.countUnreadMessagesForUser(userId);
    }

    public void markMessagesAsRead(ObjectId senderId, ObjectId receiverId) throws Exception {
        if (!friendshipService.areFriends(senderId, receiverId)) {
            throw new Exception("You can only mark messages as read with friends");
        }

        List<MessageEntity> unreadMessages = messageRepository.findUnreadMessagesFromSender(senderId, receiverId);
        
        for (MessageEntity message : unreadMessages) {
            message.setRead(true);
        }
        
        messageRepository.saveAll(unreadMessages);
    }

    public void deleteMessage(ObjectId messageId, ObjectId userId) throws Exception {
        Optional<MessageEntity> messageOpt = messageRepository.findById(messageId);
        
        if (messageOpt.isEmpty()) {
            throw new Exception("Message not found");
        }

        MessageEntity message = messageOpt.get();

        if (!message.getSender().getUserId().equals(userId)) {
            throw new Exception("You can only delete your own messages");
        }

        message.setDeleted(true);
        messageRepository.save(message);
    }

    public Map<String, Object> getConversations(ObjectId userId) {
        List<MessageEntity> allMessages = messageRepository.findAllMessagesForUser(userId);

        Map<ObjectId, List<MessageEntity>> conversationMap = new HashMap<>();
        Set<ObjectId> conversationPartners = new HashSet<>();
        
        for (MessageEntity message : allMessages) {
            ObjectId partnerId;
            if (message.getSender().getUserId().equals(userId)) {
                partnerId = message.getReceiver().getUserId();
            } else {
                partnerId = message.getSender().getUserId();
            }
            
            conversationPartners.add(partnerId);
            conversationMap.computeIfAbsent(partnerId, k -> new ArrayList<>()).add(message);
        }

        List<Map<String, Object>> conversations = new ArrayList<>();
        
        for (ObjectId partnerId : conversationPartners) {
            List<MessageEntity> messagesWithPartner = conversationMap.get(partnerId);

            messagesWithPartner.sort((m1, m2) -> m2.getSentAt().compareTo(m1.getSentAt()));

            MessageEntity lastMessage = messagesWithPartner.get(0);

            long unreadCount = messagesWithPartner.stream()
                    .filter(m -> m.getReceiver().getUserId().equals(userId) && !m.isRead())
                    .count();

            Optional<UsersEntity> partner = usersRepository.findById(partnerId);
            if (partner.isPresent()) {
                Map<String, Object> conversation = new HashMap<>();
                conversation.put("partnerId", partnerId.toString());
                conversation.put("partnerName", partner.get().getUserName());
                conversation.put("partnerEmail", partner.get().getEmail());
                conversation.put("lastMessage", lastMessage);
                conversation.put("unreadCount", unreadCount);
                conversations.add(conversation);
            }
        }

        conversations.sort((c1, c2) -> {
            MessageEntity m1 = (MessageEntity) c1.get("lastMessage");
            MessageEntity m2 = (MessageEntity) c2.get("lastMessage");
            return m2.getSentAt().compareTo(m1.getSentAt());
        });
        
        Map<String, Object> result = new HashMap<>();
        result.put("conversations", conversations);
        result.put("totalUnreadCount", getUnreadMessageCount(userId));
        
        return result;
    }
}