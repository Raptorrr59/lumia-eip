package com.example.demo.controller;

import com.example.demo.entity.NewsletterRequest;
import com.example.demo.service.EmailService;
import com.example.demo.service.UsersService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/")
public class EmailController {

    private final EmailService emailService;
    private final UsersService usersService;

    public EmailController(EmailService emailService, UsersService usersService) {
        this.emailService = emailService;
        this.usersService = usersService;
    }

    @RequestMapping("/send-test-email")
    public String sendTestEmail(HttpServletResponse httpServletResponse) {
        emailService.sendSimpleMessage("allari.marc@gmail.com", "est ce que ça marche ?", "par pitié");
        return "email sent";
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/send-news-letter")
    public ResponseEntity<String> sendNewsletter(@RequestBody NewsletterRequest request, Authentication authentication) {
        try {
            if (usersService.isAdmin(authentication)) {
                emailService.sendNewsletterToAllSubscribers(request.getSubject(), request.getContent());
                return ResponseEntity.ok("Newsletter envoyée avec succès");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erreur lors de l'envoi de la newsletter: " + e.getMessage());
        }
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Vous n'avez pas les droits pour envoyer la newsletter");
    }
}
