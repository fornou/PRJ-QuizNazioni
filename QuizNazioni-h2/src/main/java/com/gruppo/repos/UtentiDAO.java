package com.gruppo.repos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gruppo.entities.Utenti;

public interface UtentiDAO extends JpaRepository<Utenti, Integer> {
	
	public Utenti findByUsername(String username);
	
}
