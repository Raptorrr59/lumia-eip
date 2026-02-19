package com.example.demo.controller;

import com.example.demo.entity.FriendshipEntity;
import com.example.demo.entity.UsersEntity;
import com.example.demo.service.FriendshipService;
import com.example.demo.service.JwtUserService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/friends")
@CrossOrigin(origins = "*")
public class FriendshipController {

    @Autowired
    private FriendshipService friendshipService;

    @Autowired
    private JwtUserService jwtUserService;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @PostMapping("/request")
    public ResponseEntity<?> sendFriendRequest(@RequestHeader("Authorization") String token,
                                               @RequestBody Map<String, String> request) {
        try {
            String requesterId = extractUserIdFromToken(token);
            String username = request.get("username");

            if (username == null || username.isEmpty()) {
                return ResponseEntity.badRequest().body("Username is required");
            }

            FriendshipEntity friendship = friendshipService.sendFriendRequestByUsername(
                new ObjectId(requesterId),
                username
            );

            // Get requester info for notification
            UsersEntity requester = jwtUserService.getUserFromToken(token);
            String addresseeId = friendship.getAddressee().getUserId().toString();

            // Send WebSocket notification to the addressee
            messagingTemplate.convertAndSendToUser(
                addresseeId,
                "/queue/friend-requests",
                Map.of(
                    "id", friendship.getId().toString(),
                    "requesterId", requesterId,
                    "requesterName", requester.getUserName(),
                    "status", friendship.getStatus().toString(),
                    "createdAt", friendship.getCreatedAt().toString()
                )
            );

            return ResponseEntity.ok(friendship);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/accept/{requestId}")
    public ResponseEntity<?> acceptFriendRequest(@RequestHeader("Authorization") String token,
                                                 @PathVariable String requestId) {
        try {
            String userId = extractUserIdFromToken(token);

            FriendshipEntity friendship = friendshipService.acceptFriendRequest(
                new ObjectId(requestId), 
                new ObjectId(userId)
            );

            return ResponseEntity.ok(friendship);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/decline/{requestId}")
    public ResponseEntity<?> declineFriendRequest(@RequestHeader("Authorization") String token,
                                                  @PathVariable String requestId) {
        try {
            String userId = extractUserIdFromToken(token);

            friendshipService.declineFriendRequest(
                new ObjectId(requestId), 
                new ObjectId(userId)
            );

            return ResponseEntity.ok("Friend request declined");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/remove/{friendId}")
    public ResponseEntity<?> removeFriend(@RequestHeader("Authorization") String token,
                                          @PathVariable String friendId) {
        try {
            String userId = extractUserIdFromToken(token);

            friendshipService.removeFriend(
                new ObjectId(userId), 
                new ObjectId(friendId)
            );

            return ResponseEntity.ok("Friend removed successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/block")
    public ResponseEntity<?> blockUser(@RequestHeader("Authorization") String token,
                                       @RequestBody Map<String, String> request) {
        try {
            String blockerId = extractUserIdFromToken(token);
            String username = request.get("username");

            if (username == null || username.isEmpty()) {
                return ResponseEntity.badRequest().body("Username is required");
            }

            friendshipService.blockUserByUsername(
                new ObjectId(blockerId), 
                username
            );

            return ResponseEntity.ok("User blocked successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/list")
    public ResponseEntity<?> getFriends(@RequestHeader("Authorization") String token) {
        try {
            String userId = extractUserIdFromToken(token);
            List<UsersEntity> friends = friendshipService.getFriends(new ObjectId(userId));
            return ResponseEntity.ok(friends);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/requests/pending")
    public ResponseEntity<?> getPendingRequests(@RequestHeader("Authorization") String token) {
        try {
            String userId = extractUserIdFromToken(token);
            List<FriendshipEntity> requests = friendshipService.getPendingRequests(new ObjectId(userId));
            return ResponseEntity.ok(requests);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/requests/sent")
    public ResponseEntity<?> getSentRequests(@RequestHeader("Authorization") String token) {
        try {
            String userId = extractUserIdFromToken(token);
            List<FriendshipEntity> requests = friendshipService.getSentRequests(new ObjectId(userId));
            return ResponseEntity.ok(requests);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/check/{friendId}")
    public ResponseEntity<?> checkFriendship(@RequestHeader("Authorization") String token,
                                             @PathVariable String friendId) {
        try {
            String userId = extractUserIdFromToken(token);
            boolean areFriends = friendshipService.areFriends(
                new ObjectId(userId), 
                new ObjectId(friendId)
            );
            return ResponseEntity.ok(Map.of("areFriends", areFriends));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    private String extractUserIdFromToken(String token) throws Exception {
        return jwtUserService.extractUserIdFromToken(token);
    }
}