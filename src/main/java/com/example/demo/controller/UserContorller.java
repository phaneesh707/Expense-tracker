package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.models.User;
import com.example.demo.repository.UserRepository;



@RestController
public class UserContorller {
    
    @Autowired
    private UserRepository userRepo;

    // user registration
    @CrossOrigin(origins="http://localhost:3000")
	@PostMapping("/register")
    @ResponseBody
    public ResponseEntity<?> register(@RequestBody User user) {
        User check = userRepo.findByEmail(user.getEmail());
        if (check == null) {
            userRepo.save(user);
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.badRequest().body("User already exists with this email");
        }
    }

    // user login
    @CrossOrigin(origins="http://localhost:3000")
	@PostMapping("/login")
    @ResponseBody
    public ResponseEntity<?> login(@RequestBody User user) {
        User check = userRepo.findByEmail(user.getEmail());
        if (check != null && check.getPassword().equals(user.getPassword())) {
            return ResponseEntity.ok(check);
        } else {
            return ResponseEntity.badRequest().body("Invalid email or password");
        }
    }

}
