package com.example.demo.service;

import com.example.demo.entity.FriendshipEntity;
import com.example.demo.entity.UsersEntity;
import com.example.demo.entity.MessageEntity;
import com.example.demo.repository.FriendshipRepository;
import com.example.demo.repository.UsersRepository;
import com.example.demo.repository.MessageRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class FriendshipService {

    @Autowired
    private FriendshipRepository friendshipRepository;

    @Autowired
    private UsersRepository usersRepository;

    @Autowired
    private MessageRepository messageRepository;

    public FriendshipEntity sendFriendRequest(ObjectId requesterId, ObjectId addresseeId) throws Exception {
        if (requesterId.equals(addresseeId)) {
            throw new Exception("Cannot send friend request to yourself");
        }

        Optional<UsersEntity> requester = usersRepository.findById(requesterId);
        Optional<UsersEntity> addressee = usersRepository.findById(addresseeId);

        if (requester.isEmpty() || addressee.isEmpty()) {
            throw new Exception("User not found");
        }

        Optional<FriendshipEntity> existingFriendship = friendshipRepository.findFriendshipBetweenUsers(requesterId, addresseeId);
        if (existingFriendship.isPresent()) {
            FriendshipEntity friendship = existingFriendship.get();
            switch (friendship.getStatus()) {
                case ACCEPTED:
                    throw new Exception("Users are already friends");
                case PENDING:
                    throw new Exception("Friend request already sent");
                case BLOCKED:
                    throw new Exception("Cannot send friend request to blocked user");
                case DECLINED:
                    break;
            }
        }

        FriendshipEntity friendship = new FriendshipEntity(requester.get(), addressee.get(), FriendshipEntity.FriendshipStatus.PENDING);
        return friendshipRepository.save(friendship);
    }

    public FriendshipEntity acceptFriendRequest(ObjectId requestId, ObjectId userId) throws Exception {
        Optional<FriendshipEntity> friendshipOpt = friendshipRepository.findById(requestId);
        
        if (friendshipOpt.isEmpty()) {
            throw new Exception("Friend request not found");
        }

        FriendshipEntity friendship = friendshipOpt.get();

        if (!friendship.getAddressee().getUserId().equals(userId)) {
            throw new Exception("You cannot accept this friend request");
        }

        if (friendship.getStatus() != FriendshipEntity.FriendshipStatus.PENDING) {
            throw new Exception("Friend request is not pending");
        }

        friendship.setStatus(FriendshipEntity.FriendshipStatus.ACCEPTED);
        FriendshipEntity savedFriendship = friendshipRepository.save(friendship);

        initializeConversation(friendship.getRequester(), friendship.getAddressee());

        return savedFriendship;
    }

    public void declineFriendRequest(ObjectId requestId, ObjectId userId) throws Exception {
        Optional<FriendshipEntity> friendshipOpt = friendshipRepository.findById(requestId);
        
        if (friendshipOpt.isEmpty()) {
            throw new Exception("Friend request not found");
        }

        FriendshipEntity friendship = friendshipOpt.get();

        if (!friendship.getAddressee().getUserId().equals(userId)) {
            throw new Exception("You cannot decline this friend request");
        }

        if (friendship.getStatus() != FriendshipEntity.FriendshipStatus.PENDING) {
            throw new Exception("Friend request is not pending");
        }

        friendship.setStatus(FriendshipEntity.FriendshipStatus.DECLINED);
        friendshipRepository.save(friendship);
    }

    public void removeFriend(ObjectId userId, ObjectId friendId) throws Exception {
        Optional<FriendshipEntity> friendshipOpt = friendshipRepository.findAcceptedFriendshipBetweenUsers(userId, friendId);
        
        if (friendshipOpt.isEmpty()) {
            throw new Exception("Friendship not found");
        }

        friendshipRepository.delete(friendshipOpt.get());
    }

    public void blockUser(ObjectId blockerId, ObjectId blockedId) throws Exception {
        if (blockerId.equals(blockedId)) {
            throw new Exception("Cannot block yourself");
        }

        Optional<UsersEntity> blocker = usersRepository.findById(blockerId);
        Optional<UsersEntity> blocked = usersRepository.findById(blockedId);

        if (blocker.isEmpty() || blocked.isEmpty()) {
            throw new Exception("User not found");
        }

        Optional<FriendshipEntity> existingFriendship = friendshipRepository.findFriendshipBetweenUsers(blockerId, blockedId);
        if (existingFriendship.isPresent()) {
            friendshipRepository.delete(existingFriendship.get());
        }

        FriendshipEntity blockedRelationship = new FriendshipEntity(blocker.get(), blocked.get(), FriendshipEntity.FriendshipStatus.BLOCKED);
        friendshipRepository.save(blockedRelationship);
    }

    public List<UsersEntity> getFriends(ObjectId userId) {
        List<FriendshipEntity> friendships = friendshipRepository.findAcceptedFriendshipsByUserId(userId);

        return friendships.stream()
                .map(friendship -> {
                    if (friendship.getRequester().getUserId().equals(userId)) {
                        return friendship.getAddressee();
                    } else {
                        return friendship.getRequester();
                    }
                })
                .collect(Collectors.toList());
    }

    public List<FriendshipEntity> getPendingRequests(ObjectId userId) {
        return friendshipRepository.findPendingRequestsForUser(userId);
    }

    public List<FriendshipEntity> getSentRequests(ObjectId userId) {
        return friendshipRepository.findPendingRequestsByUser(userId);
    }

    public boolean areFriends(ObjectId user1Id, ObjectId user2Id) {
        return friendshipRepository.findAcceptedFriendshipBetweenUsers(user1Id, user2Id).isPresent();
    }

    public FriendshipEntity sendFriendRequestByUsername(ObjectId requesterId, String username) throws Exception {
        Optional<UsersEntity> addressee = usersRepository.findByUserName(username);
        
        if (addressee.isEmpty()) {
            throw new Exception("User with username '" + username + "' not found");
        }

        return sendFriendRequest(requesterId, addressee.get().getUserId());
    }

    public void blockUserByUsername(ObjectId blockerId, String username) throws Exception {
        Optional<UsersEntity> userToBlock = usersRepository.findByUserName(username);
        
        if (userToBlock.isEmpty()) {
            throw new Exception("User with username '" + username + "' not found");
        }

        blockUser(blockerId, userToBlock.get().getUserId());
    }

    private void initializeConversation(UsersEntity user1, UsersEntity user2) {
        try {
            MessageEntity welcomeMessage = new MessageEntity(
                user1, 
                user2, 
                "You are now friends! Start chatting!", 
                MessageEntity.MessageType.TEXT
            );
            welcomeMessage.setRead(false);
            messageRepository.save(welcomeMessage);
        } catch (Exception e) {
            System.err.println("Failed to initialize conversation: " + e.getMessage());
        }
    }
}