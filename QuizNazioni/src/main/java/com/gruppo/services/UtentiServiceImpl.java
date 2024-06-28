package com.gruppo.services;

import java.util.List;
import java.util.Set;
import java.util.TreeSet;

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

	@Override
	public Utenti insertUsers(String username, String password) {
		Utenti dto = new Utenti(username, password);
		return dao.save(dto);
	}

	@Override
	public Set<String> getUtenti() {
		return new TreeSet<String>(dao.findAll().stream().map(d->d.getUsername()).sorted().toList());
	}
	
	

}
