package com.gruppo.services;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.TreeSet;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gruppo.entities.StatisticheDTO;
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
		Utenti dto = new Utenti();
		dto.setUsername(username);
		dto.setPassword(password);
		dto.setRecord_memory(100000);
		return dao.save(dto);
	}

	@Override
	public Set<String> getUtenti() {
		return new TreeSet<String>(dao.findAll().stream().map(d->d.getUsername()).sorted().toList());
	}

	@Override
	public Utenti salvaStat(StatisticheDTO dto,int id) {
		Optional<Utenti> utente =dao.findById(id);
		Utenti u = utente.get();
		
		u.setQuiz_tentati(dto.getQuiz_tentati());
		u.setQuiz_passati(dto.getQuiz_passati());
		u.setQuiz_bocciati(dto.getQuiz_bocciati());
		u.setRisposte_corrette(dto.getRisposte_corrette());
		u.setRisposte_errate(dto.getRisposte_errate());
		u.setPartite_memory(dto.getPartite_memory());
		u.setRecord_memory(dto.getRecord_memory());

		
		return dao.save(u);
	}


	

}
