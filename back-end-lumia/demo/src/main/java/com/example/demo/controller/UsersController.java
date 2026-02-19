package com.example.demo.controller;

import com.example.demo.BadgeName;
import com.example.demo.EventName;
import com.example.demo.RoleName;
import com.example.demo.entity.*;
import com.example.demo.entity.dto.CreateUserDto;
import com.example.demo.entity.dto.EventCountDTO;
import com.example.demo.entity.dto.LoginRequest;
import com.example.demo.entity.dto.UpdatePasswordDTO;
import com.example.demo.exeption.BadgeAlreadyOwnedException;
import com.example.demo.exeption.CategoryNotFoundException;
import com.example.demo.repository.*;
import com.example.demo.security.JwtUtility;
import com.example.demo.service.*;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.security.Principal;
import java.time.LocalDateTime;
import java.util.*;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.io.File;
import java.io.FileWriter;

@RequestMapping("/api/")
@RestController
public class UsersController {

    @Autowired
    private final TurnstileService turnstileService;

    private final UsersRepository usersRepository;
    private final UsersService usersService;
    private final UserTokensRepository userTokensRepository;
    private final RoleRepository roleRepository;
    private final EmailService emailService;
    private final EmailRepository emailRepository;
    private final BadgeRepository badgeRepository;
    private final BadgesService badgesService;
    private final EventRegistrationRepository eventRegistrationRepository;
    private final PasswordEncoder passwordEncoder;

    public UsersController(TurnstileService turnstileService, UsersRepository usersRepository, UsersService usersService,
                           UserTokensRepository userTokensRepository, RoleRepository roleRepository,
                           EmailService emailService, EmailRepository emailRepository, BadgeRepository badgeRepository,
                           BadgesService badgesService, EventRegistrationRepository eventRegistrationRepository,
                           PasswordEncoder passwordEncoder) {
        this.turnstileService = turnstileService;
        this.usersRepository = usersRepository;
        this.usersService = usersService;
        this.userTokensRepository = userTokensRepository;
        this.roleRepository = roleRepository;
        this.emailService = emailService;
        this.emailRepository = emailRepository;
        this.badgeRepository = badgeRepository;
        this.badgesService = badgesService;
        this.eventRegistrationRepository = eventRegistrationRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/allUsers")
    List<UsersEntity> getAllUsers() {
        return usersRepository.findAll();
    }

    @GetMapping("/users/{id}")
    UsersEntity getByUsers(@PathVariable String id) {
        return usersRepository.findById(new ObjectId(id))
                .orElseThrow(() -> new CategoryNotFoundException("User not found"));
    }

    @GetMapping("/check-banned-email")
    public ResponseEntity<?> checkBannedEmail(@RequestParam String email) {
        Optional<UsersEntity> userOpt = usersRepository.findByEmail(email);
        UsersEntity user = userOpt.orElse(null);

        Map<String, Boolean> response = new HashMap<>();
        response.put("isBanned", user != null && user.isBanned());

        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest) {
        String email = loginRequest.getEmail();
        String password = loginRequest.getPassword();

        Optional<UsersEntity> userOpt = usersRepository.findByEmail(email);
        UsersEntity check_user = userOpt.orElse(null);

        if (check_user != null && check_user.isBanned()) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body("Votre compte a été banni");
        }

        if (check_user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Email ou mot de passe incorrect");
        }

        try {
            UsersEntity user = usersService.login(email, password);
            String accessToken = JwtUtility.generateAccessToken(user.getUserName());
            String refreshToken = JwtUtility.generateRefreshToken(user.getUserName());

            UserTokens userTokens = new UserTokens();
            userTokens.setUserId(user.getUserId());
            userTokens.setAccessToken(accessToken);
            userTokens.setRefreshToken(refreshToken);
            userTokens.setCreatedAt(new Date());
            userTokens.setAccessTokenExpiresAt(new Date(System.currentTimeMillis() + JwtUtility.ACCESS_TOKEN_EXPIRATION_TIME));
            userTokens.setRefreshTokenExpiresAt(new Date(System.currentTimeMillis() + JwtUtility.REFRESH_TOKEN_EXPIRATION_TIME));

            userTokensRepository.deleteByUserId(user.getUserId());
            userTokensRepository.save(userTokens);

            String roleName = String.valueOf(user.getRoles().iterator().next().getName());

            return ResponseEntity.ok(Map.of(
                    "accessToken", accessToken,
                    "refreshToken", refreshToken,
                    "userId", user.getUserId().toString(),
                    "role", roleName
            ));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<?> refreshToken(@RequestParam String refreshToken) {
        try {
            String username = JwtUtility.extractUsername(refreshToken);
            String newAccessToken = JwtUtility.generateAccessToken(username);

            return ResponseEntity.ok(Map.of(
                    "accessToken", newAccessToken
            ));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid refresh token");
        }
    }

    @PostMapping("/newUser")
    public ResponseEntity<?> addUser(@Valid @RequestBody CreateUserDto userDto,
                                     @RequestParam("cf-turnstile-response") String token,
                                     HttpServletRequest request) throws MessagingException {
        if (userDto.getPassword().isEmpty()) {
            throw new CategoryNotFoundException("Password is required");
        }

        Optional<UsersEntity> userOpt = usersRepository.findByEmail(userDto.getEmail());
        UsersEntity check_user = userOpt.orElse(null);

        if (check_user != null && check_user.isBanned()) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body("Votre compte a été banni");
        }

        if (usersRepository.findByEmail(userDto.getEmail()).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("User already exists with this email");
        }

        if (usersRepository.findByUserName(userDto.getUserName()).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("User already exists with this userName");
        }

        String remoteip = request.getHeader("CF-Connecting-IP");
        if (remoteip == null) remoteip = request.getHeader("X-Forwarded-For");
        if (remoteip == null) remoteip = request.getRemoteAddr();

        TurnstileResponse validation = TurnstileService.validateToken(token, remoteip);
        if (!validation.isSuccess()) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body("Captcha invalid or bot detected: " + validation.getErrorCodes());
        }

        UsersEntity user = new UsersEntity();
        user.setEmail(userDto.getEmail());
        user.setPassword(passwordEncoder.encode(userDto.getPassword()));
        user.setUserName(userDto.getUserName());
        user.setSubscribed(userDto.getSubscribed());

        RoleEntity savedRole = roleRepository.findByName(RoleName.USER)
                .orElseGet(() -> {
                    RoleEntity newRole = new RoleEntity();
                    newRole.setName(RoleName.USER);
                    return roleRepository.save(newRole);
                });

        BadgeEntity badge = badgeRepository.findByBadgeName(BadgeName.BEGINNER).orElseGet(() -> {
            BadgeEntity newBadge = new BadgeEntity();
            newBadge.setBadgeName(BadgeName.BEGINNER);
            return badgeRepository.save(newBadge);
        });

        user.getRoles().add(savedRole);
        user.getBadges().add(badge);
        usersRepository.save(user);

        EmailEntity EmailEntity = new EmailEntity(EmailService.generateToken(), user.getUserId().toString()
        );
        emailRepository.save(EmailEntity);
        emailService.sendMessage(user.getEmail(), EmailEntity.getToken());

        return ResponseEntity.status(HttpStatus.CREATED).body(user);
    }

    @PutMapping("/{id}/password")
    public ResponseEntity<?> updatePassword(@PathVariable String id, @RequestBody UpdatePasswordDTO updatePasswordDTO, Principal principal) {
        String loggedInUsername = principal.getName();

        Optional<UsersEntity> userOpt = usersRepository.findByUserName(loggedInUsername);
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        
        UsersEntity user = userOpt.get();
        if (!user.getUserId().toString().equals(id)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
        usersService.updatePassword(id, updatePasswordDTO);
        return ResponseEntity.ok("Mot de passe mis à jour avec succès");
    }

    @GetMapping("/confirmEmail")
    public ResponseEntity<?> confirmEmail(@RequestParam("token") String token, HttpServletResponse response) {
        Optional<EmailEntity> emailConfirmationOptional = emailRepository.findByToken(token);

        if (emailConfirmationOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Invalid token");
        }

        EmailEntity emailConfirmation = emailConfirmationOptional.get();

        if (emailConfirmation.getExpiredAt().isBefore(LocalDateTime.now())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Token expired");
        }

        try {
            UsersEntity user = usersRepository.findById(new ObjectId(emailConfirmation.getUserId()))
                    .orElseThrow(() -> new CategoryNotFoundException("User not found"));

            user.setEmailVerified(true);
            usersRepository.save(user);
            emailRepository.delete(emailConfirmation);
            response.sendRedirect("http://localhost:8080/");
            return ResponseEntity.ok("Email confirmed successfully");
        } catch (IllegalArgumentException | IOException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid user ID format");
        }
    }

    @PostMapping("/newEmailValidation")
    public ResponseEntity<?> newEmailValidation(@RequestParam("userId") String userId) throws MessagingException {
        var convertToObjectId = new ObjectId(userId);

        Optional<EmailEntity> emailConfirmation = emailRepository.findByUserId(userId);
        Optional<UsersEntity> userOpt = usersRepository.findByUserId(convertToObjectId);

        if (userOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
        
        UsersEntity user = userOpt.get();

        if (emailConfirmation.isPresent()) {
            EmailEntity emailEntity = emailConfirmation.get();
            if (emailConfirmation.get().getExpiredAt().isBefore(LocalDateTime.now())) {
                emailRepository.delete(emailEntity);
                EmailEntity newEmailEntity = new EmailEntity(EmailService.generateToken(), userId);
                emailRepository.save(newEmailEntity);
                emailService.sendMessage(user.getEmail(), newEmailEntity.getToken());
                return ResponseEntity.status(HttpStatus.ACCEPTED).body("New email sent successfully");
            }
            return ResponseEntity.status(HttpStatus.CONFLICT).body("An email was already sent");
        }

        EmailEntity emailEntity = new EmailEntity(EmailService.generateToken(), userId);
        emailRepository.save(emailEntity);
        emailService.sendMessage(user.getEmail(), emailEntity.getToken());
        return ResponseEntity.ok("New email for verification send successfully");
    }

    @PatchMapping("/set-news-letter")
    public ResponseEntity<?> isSubscribed(@RequestParam("userId") String userId, @RequestParam("subscribed") boolean subscribed) {
        try {

            Optional<UsersEntity> userOptional = usersRepository.findById(new ObjectId(userId));

            if (userOptional.isPresent()) {
                UsersEntity user = userOptional.get();
                user.setSubscribed(subscribed);
                usersRepository.save(user);

                String message = subscribed ?
                        "Vous êtes maintenant abonné à notre newsletter." :
                        "Vous êtes maintenant désabonné de notre newsletter.";

                return ResponseEntity.ok().body(Map.of(
                        "success", true,
                        "message", message
                ));
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of(
                        "success", false,
                        "message", "Utilisateur non trouvé avec l'ID: " + userId
                ));
            }
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of(
                    "success", false,
                    "message", "ID d'utilisateur non valide: " + userId
            ));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                    "success", false,
                    "message", "Erreur lors de la mise à jour des préférences: " + e.getMessage()
            ));
        }
    }

    @GetMapping("/get-lumia-coin")
    public ResponseEntity<?> getLumiaCoin(@RequestParam("userId") String userId) {
        try {
            Optional<UsersEntity> userOptional = usersRepository.findById(new ObjectId(userId));
            if (userOptional.isPresent()) {
                UsersEntity user = userOptional.get();
                return ResponseEntity.ok(user.getLumiaCoin());
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Utilisateur non trouvé");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erreur lors de la récupération des LumiaCoins : " + e.getMessage());
        }
    }

    @PatchMapping("/update-lumia-coin")
    public ResponseEntity<?> setLumiaCoin(@RequestParam("userId") String userId, @RequestParam("lumiaCoin") int lumiaCoin) {
        try {
            Optional<UsersEntity> userOptional = usersRepository.findById(new ObjectId(userId));
            if (userOptional.isPresent()) {
                UsersEntity user = userOptional.get();
                Integer newLumiaCoin = user.getLumiaCoin() + lumiaCoin;
                user.setLumiaCoin(newLumiaCoin);
                usersRepository.save(user);
                return ResponseEntity.ok(user.getLumiaCoin());
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Utilisateur non trouvé");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erreur lors de la mise à jour des LumiaCoins : " + e.getMessage());
        }
    }

    @GetMapping("/{userId}/badges")
    public ResponseEntity<Set<BadgeEntity>> getBadges(@PathVariable("userId") String userId) {
        Set<BadgeEntity> badges = badgesService.getUserBadges(userId);
        return ResponseEntity.ok(badges);
    }

    @PostMapping("/{userId}/badges")
    public ResponseEntity<?> addBadge(@PathVariable("userId") String userId, @RequestParam BadgeName badge) throws BadgeAlreadyOwnedException {
        UsersEntity user = badgesService.addBadgeToUser(userId, badge);

        return ResponseEntity.ok(user);
    }

    @PostMapping("/send-event-registration-email")
    public ResponseEntity<String> sendEventRegistrationEmail(@RequestParam EventName eventName,
                                                             @RequestParam String userEmail,
                                                             @RequestParam String userName,
                                                             @RequestParam("cf-turnstile-response") String token,
                                                             HttpServletRequest request) {
        try {
            if (eventRegistrationRepository.existsByEventTitleAndUserEmail(eventName, userEmail)) {
                return ResponseEntity.badRequest().body("Utilisateur déjà inscrit à cet événement.");
            }

            String remoteip = request.getHeader("CF-Connecting-IP");
            if (remoteip == null) remoteip = request.getHeader("X-Forwarded-For");
            if (remoteip == null) remoteip = request.getRemoteAddr();

            TurnstileResponse validation = TurnstileService.validateToken(token, remoteip);
            if (!validation.isSuccess()) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body("Captcha invalid or bot detected: " + validation.getErrorCodes());
            }

            EventRegistrationEntity registration = new EventRegistrationEntity(userEmail, userName, eventName);
            eventRegistrationRepository.save(registration);

            String subject = "Confirmation d'inscription à l'événement : " + eventName.name();
            String htmlContent = String.format(
                    "<html><body>" +
                            "<h2>Confirmation d'inscription</h2>" +
                            "<p>Bonjour %s,</p>" +
                            "<p>Nous avons le plaisir de vous confirmer votre inscription à l'événement : <strong>%s</strong>.</p>" +
                            "<p>Cette confirmation a été envoyée à l'adresse : %s.</p>" +
                            "<p>Nous nous réjouissons de vous y voir !</p>" +
                            "</body></html>",
                    userName, eventName.name(), userEmail
            );
            emailService.sendNewsletterEmail(userEmail, subject, htmlContent);

            return ResponseEntity.ok("Inscription réussie et email de confirmation envoyé.");

        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erreur interne du serveur : " + e.getMessage());
        }
    }

    @GetMapping("/check-event-registration/{eventName}")
    public ResponseEntity<Map<String, Boolean>> checkEventRegistration(
            @RequestParam EventName eventName,
            @RequestParam String userEmail) {
        boolean isRegistered = eventRegistrationRepository.existsByEventTitleAndUserEmail(eventName, userEmail);
        Map<String, Boolean> response = new HashMap<>();
        response.put("isRegistered", isRegistered);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/events/{eventName}/registrations/count")
    public ResponseEntity<Map<String, Object>> getRegistrationCount(@PathVariable EventName eventName) {
        try {
            long count = eventRegistrationRepository.countByEventTitle(eventName);

            Map<String, Object> response = Map.of(
                    "eventName", eventName.name(),
                    "registrationCount", count
            );
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }

    @DeleteMapping("/unregister-from-event")
    public ResponseEntity<String> unregister(@RequestParam EventName eventName,
                                             @RequestParam String userEmail,
                                             @RequestParam("cf-turnstile-response") String token,
                                             HttpServletRequest request) {
        try {

            String remoteip = request.getHeader("CF-Connecting-IP");
            if (remoteip == null) remoteip = request.getHeader("X-Forwarded-For");
            if (remoteip == null) remoteip = request.getRemoteAddr();

            TurnstileResponse validation = TurnstileService.validateToken(token, remoteip);
            if (!validation.isSuccess()) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body("Captcha invalid or bot detected: " + validation.getErrorCodes());
            }
            long deletedCount = eventRegistrationRepository.deleteByEventTitleAndUserEmail(eventName, userEmail);

            if (deletedCount > 0) {
                String subject = "Confirmation de désinscription de l'événement : " + eventName.name();
                String htmlContent = String.format(
                        "<html><body>" +
                                "<h2>Confirmation de désinscription</h2>" +
                                "<p>Bonjour %s,</p>" +
                                "<p>Nous vous confirmons que votre désinscription de l'événement : <strong>%s</strong> a bien été prise en compte.</p>" +
                                "<p>Nous espérons vous revoir bientôt lors d'un prochain événement.</p>" +
                                "</body></html>",
                        userEmail, eventName.name()
                );

                emailService.sendNewsletterEmail(userEmail, subject, htmlContent);
                return ResponseEntity.ok("Désinscription réussie de l'événement " + eventName.name());
            } else {
                return ResponseEntity.status(404).body("Inscription non trouvée. L'utilisateur n'était pas inscrit à cet événement.");
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erreur interne du serveur : " + e.getMessage());
        }
    }

    @GetMapping("/registrations/summary")
    public ResponseEntity<List<EventCountDTO>> getRegistrationSummary() {
        try {
            List<EventCountDTO> summary = eventRegistrationRepository.countTotalRegistrationsByEvent();
            return ResponseEntity.ok(summary);
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/users/{userName}/complete")
    public ResponseEntity<Map<String, Object>> deleteaUser(@PathVariable String userName, Principal principal) {
        Map<String, Object> response = new HashMap<>();

        try {
            Optional<UsersEntity> userOpt = usersRepository.findByUserName(userName);
            UsersEntity user = userOpt.orElse(null);
            boolean deleted = usersService.deleteUserByUserName(userName);

            if (deleted) {
                response.put("success", true);
                response.put("message", "Utilisateur '" + userName + "' à été bannis et tous ses commentaires ont été supprimés avec succès");

                // Log the ban event
                if (user != null && principal != null) {
                    String adminName = principal.getName();
                    Optional<UsersEntity> adminOpt = usersRepository.findByUserName(adminName);
                    String adminEmail = adminOpt.map(UsersEntity::getEmail).orElse("unknown");
                    String logEntry = String.format(
                        "BANNED USER - Username: %s, Email: %s | BANNED BY ADMIN - Username: %s, Email: %s%n",
                        user.getUserName(), user.getEmail(), adminName, adminEmail
                    );
                    String logFilePath = "banned-users-log.txt";
                    File logFile = new File(logFilePath);
                    System.out.println("Attempting to write ban log to: " + logFile.getAbsolutePath());
                    try (FileWriter fw = new FileWriter(logFile, true)) {
                        fw.write(logEntry);
                        System.out.println("Ban log written successfully.");
                    } catch (IOException ioe) {
                        ioe.printStackTrace();
                    }
                }

                return ResponseEntity.ok(response);
            } else {
                response.put("success", false);
                response.put("message", "Utilisateur '" + userName + "' non trouvé");
                return ResponseEntity.notFound().build();
            }

        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Erreur lors de la suppression: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
}
