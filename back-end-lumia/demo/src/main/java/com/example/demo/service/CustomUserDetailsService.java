package com.example.demo.service;

import com.example.demo.entity.UsersEntity;
import com.example.demo.entity.RoleEntity;
import com.example.demo.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UsersRepository usersRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<UsersEntity> userOpt = usersRepository.findByUserName(username);

        if (userOpt.isEmpty()) {
            throw new UsernameNotFoundException("Utilisateur non trouvé: " + username);
        }
        
        UsersEntity user = userOpt.get();

        Set<SimpleGrantedAuthority> authorities = user.getRoles().stream()
                .map(role -> new SimpleGrantedAuthority("ROLE_" + role.getName().toString()))
                .collect(Collectors.toSet());

        return User.builder()
                .username(user.getUserName())
                .password(user.getPassword())
                .authorities(authorities)
                .build();
    }
}