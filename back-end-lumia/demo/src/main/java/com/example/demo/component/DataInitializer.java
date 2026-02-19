package com.example.demo.component;

import com.example.demo.BadgeName;
import com.example.demo.EventName;
import com.example.demo.RoleName;
import com.example.demo.entity.BadgeEntity;
import com.example.demo.entity.EventNamesEntity;
import com.example.demo.entity.RoleEntity;
import com.example.demo.repository.BadgeRepository;
import com.example.demo.repository.EventNamesRepository;
import com.example.demo.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {
    private final RoleRepository roleRepository;
    private final BadgeRepository badgeRepository;
    private final EventNamesRepository eventNamesRepository;

    @Autowired
    public DataInitializer(RoleRepository roleRepository, BadgeRepository badgeRepository, EventNamesRepository eventNamesRepository) {
        this.roleRepository = roleRepository;
        this.badgeRepository = badgeRepository;
        this.eventNamesRepository = eventNamesRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        for (RoleName roleName : RoleName.values()) {
            if (roleRepository.findByName(roleName).isEmpty()) {
                RoleEntity role = new RoleEntity();
                role.setName(roleName);
                roleRepository.save(role);
            }
        }

        for (EventName eventName : EventName.values()) {
            if (eventNamesRepository.findByEventName(eventName).isEmpty()) {
                EventNamesEntity eventNameEntity = new EventNamesEntity();
                eventNameEntity.setEventsName(eventName);
                eventNamesRepository.save(eventNameEntity);
            }
        }

        for (BadgeName badgeName : BadgeName.values()) {
            if (badgeRepository.findByBadgeName(badgeName).isEmpty()) {
                BadgeEntity badge = new BadgeEntity();
                badge.setBadgeName(badgeName);
                badgeRepository.save(badge);
            }
        }
    }
}
