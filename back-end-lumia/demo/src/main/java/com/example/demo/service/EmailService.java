package com.example.demo.service;

import com.example.demo.entity.UsersEntity;
import com.example.demo.repository.UsersRepository;
import com.resend.core.exception.ResendException;
import com.resend.services.emails.model.CreateEmailOptions;
import com.resend.services.emails.model.CreateEmailResponse;
import jakarta.mail.MessagingException;
import org.springframework.stereotype.Service;
import com.resend.*;

import java.util.List;
import java.util.UUID;

@Service
public class EmailService {
    private final UsersRepository usersRepository;

    public EmailService(UsersRepository usersRepository) {
        this.usersRepository = usersRepository;
    }

    public void sendSimpleMessage(String to, String subject, String text) {
        Resend resend = new Resend("re_Hnq6cEqp_voACz9rg8wuh6Hku11GKR1Sk");

        CreateEmailOptions params = CreateEmailOptions.builder()
                .from("Lumia <contact@eip-lumia.fr>")
                .to(to)
                .subject(subject)
                .html(text)
                .build();

        try {
            CreateEmailResponse data = resend.emails().send(params);
        } catch (ResendException e) {
            e.printStackTrace();
        }
       // message.setFrom("contact@eip-lumia.fr");
    }

    public static String generateToken() {
        return UUID.randomUUID().toString();
    }

    public void sendMessage(String to, String token) {
        String confirmationUrl = "http://localhost:8000/api/confirmEmail?token=" + token;
        String subject = "Lumia Confirmation";
        String body = "<html>" +
                "<body style=\"font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;\">" +
                "<div style=\"background-color: #ffffff; margin: 20px auto; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); max-width: 600px;\">" +
                "<h1 style=\"color: #333333;\">Bienvenue sur Lumia!</h1>" +
                "<p style=\"color: #666666;\">Merci de vous être inscrit sur Lumia. Pour finaliser votre inscription, veuillez cliquer sur le lien ci-dessous pour confirmer votre adresse email :</p>" +
                "<a href=\"" + confirmationUrl + "\" style=\"display: inline-block; padding: 10px 20px; background-color: #007BFF; color: #ffffff; text-decoration: none; border-radius: 5px; margin-top: 20px;\">Confirmer mon email</a>" +
                "<p style=\"color: #666666; margin-top: 20px;\">Si vous n'avez pas créé de compte, vous pouvez ignorer cet email.</p>" +
                "<p style=\"color: #666666;\">Cordialement,<br>L'équipe Lumia</p>" +
                "</div>" +
                "</body>" +
                "</html>";

        sendSimpleMessage(to, subject, body);
    }

    public void sendNewsletterToAllSubscribers(String subject, String content) {
        List<UsersEntity> subscribers = usersRepository.findAllBySubscribedIsTrue();
    
        for (UsersEntity subscriber : subscribers) {
            try {
                sendNewsletterEmail(subscriber.getEmail(), subject, content);
                Thread.sleep(500); // Resend rate limit: 2 req/s
            } catch (MessagingException e) {
                System.err.println("Erreur lors de l'envoi de la newsletter à " + subscriber.getEmail() + ": " + e.getMessage());
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                break;
            }
        }
    }

    public void sendNewsletterEmail(String to, String subject, String htmlContent) throws MessagingException {
        sendSimpleMessage(to, subject, htmlContent);
    }
}