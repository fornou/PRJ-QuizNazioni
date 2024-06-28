package com.gruppo.services;

import com.gruppo.entities.Utenti;

public interface UtentiService {
	
	 public Utenti authenticate(String username, String password);
	 public   Utenti verifyUser(String username, String password);

}
