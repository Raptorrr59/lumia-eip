package com.example.demo.security;
import org.springframework.core.env.Environment;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import javax.crypto.SecretKey;

import java.security.Key;
import java.util.Date;

public class JwtUtility {

    private static Environment environment;

    private final static String SECRET = "dsqkdksqk578dkjsmdkflgobokmfmezofokez4567892T&&dsdkhvbnx,";
    private static final Key SECRET_KEY = Keys.hmacShaKeyFor(SECRET.getBytes());
    public static final long ACCESS_TOKEN_EXPIRATION_TIME  = 864_000_000; // 10 days
    public static final long REFRESH_TOKEN_EXPIRATION_TIME = 36_000_000;

    public static String generateAccessToken(String username) {
        return Jwts.builder()
                .subject(username)
                .expiration(new Date(System.currentTimeMillis() + ACCESS_TOKEN_EXPIRATION_TIME ))
                .signWith(SECRET_KEY)
                .compact();
    }
    public static String generateRefreshToken(String username) {
        return Jwts.builder()
                .subject(username)
                .expiration(new Date(System.currentTimeMillis() + REFRESH_TOKEN_EXPIRATION_TIME))
                .signWith(SECRET_KEY)
                .compact();
    }

    public static String extractUsername(String token) {
        Claims claims = Jwts.parser()
                .verifyWith((SecretKey) SECRET_KEY)
                .build()
                .parseSignedClaims(token)
                .getPayload();
        return claims.getSubject();
    }

    public static boolean validateToken(String token) {
        try {
            Jwts.parser()
                    .verifyWith((SecretKey) SECRET_KEY)
                    .build()
                    .parseSignedClaims(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
