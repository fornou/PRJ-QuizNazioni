package com.gruppo.services;

import java.util.List;
import java.util.Set;

import com.gruppo.entities.Utenti;

public interface UtentiService {
	
	 public Utenti authenticate(String username, String password);
	 public   Utenti verifyUser(String username, String password);
	 
	 public Utenti insertUsers(String username, String password);
	 
	 public Set<String> getUtenti();

}
