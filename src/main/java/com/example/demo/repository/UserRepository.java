package com.example.demo.repository;

import com.example.demo.models.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;


@RepositoryRestResource
public interface UserRepository extends JpaRepository<User, Long> {
    // public User findByUsername(String username);
    public User findByEmail(String email);
    
}
