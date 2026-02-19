package com.example.demo.repository;

import com.example.demo.RoleName;
import com.example.demo.entity.RoleEntity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends MongoRepository<RoleEntity, Integer> {
    Optional<RoleEntity> findByName(RoleName roleName);
}
