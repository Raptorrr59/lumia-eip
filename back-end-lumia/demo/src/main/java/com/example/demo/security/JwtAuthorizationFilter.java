package com.example.demo.security;

import com.example.demo.repository.UserTokensRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class JwtAuthorizationFilter extends OncePerRequestFilter {

    private final UserTokensRepository userTokensRepository;
    private final UserDetailsService userDetailsService;

    public JwtAuthorizationFilter(UserTokensRepository userTokensRepository,
                                  UserDetailsService userDetailsService) {
        this.userTokensRepository = userTokensRepository;
        this.userDetailsService = userDetailsService;
    }

    private boolean isTokenInDatabase(String token) {
        return userTokensRepository.findByAccessToken(token).isPresent();
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        String header = request.getHeader("Authorization");
        if (header == null || !header.startsWith("Bearer ")) {
            if (isLocalhost(request) && isProtectedRoute(request)) {
                filterChain.doFilter(request, response);
                return;
            } else if (isProtectedRoute(request)) {
                response.setStatus(HttpServletResponse.SC_FORBIDDEN);
                return;
            }
            filterChain.doFilter(request, response);
            return;
        }

        String token = header.replace("Bearer ", "");
        if (JwtUtility.validateToken(token)) {
            if (isTokenInDatabase(token)) {
                String username = JwtUtility.extractUsername(token);

                UserDetails userDetails = userDetailsService.loadUserByUsername(username);

                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities());
                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authentication);
                filterChain.doFilter(request, response);
            } else {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            }
        } else {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        }
    }

    private boolean isLocalhost(HttpServletRequest request) {
        String host = request.getServerName();
        return "localhost".equals(host) || "127.0.0.1".equals(host);
    }

    private boolean isProtectedRoute(HttpServletRequest request) {
            String path = request.getServletPath();
            return !path.startsWith("/api/public/") && !path.startsWith("/login");
        }
}