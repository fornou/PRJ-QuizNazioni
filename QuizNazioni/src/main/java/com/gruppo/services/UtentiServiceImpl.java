package com.gruppo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gruppo.entities.Utenti;
import com.gruppo.repos.UtentiDAO;

@Service
public class UtentiServiceImpl implements UtentiService {
	
	 @Autowired
	private  UtentiDAO dao;

	@Override
	public Utenti authenticate(String username, String password) {
		 Utenti user = dao.findByUsername(username);
	        if (user != null && user.getPassword().equals(password)) {
	            return user;
	        }
	        return null;
	}

	@Override
	public Utenti verifyUser(String username, String password) {
        Utenti user = dao.findByUsername(username);
        if (user != null && user.getPassword().equals(password)) {
            return user;
        }
        return null;
    }
	
	

}
