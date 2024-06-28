package com.gruppo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.gruppo.entities.Utenti;
import com.gruppo.services.UtentiService;

import jakarta.servlet.http.HttpSession;

@RestController
public class LoginController {
	
    @Autowired
    private UtentiService utentiService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Utenti loginRequest, HttpSession session) {
        Utenti user = utentiService.authenticate(loginRequest.getUsername(), loginRequest.getPassword());
        if (user != null) {
            session.setAttribute("user", user);
            return ResponseEntity.ok().body("Login successful");
        } else {
            return ResponseEntity.status(401).body("Invalid credentials");
        }
    }
}
