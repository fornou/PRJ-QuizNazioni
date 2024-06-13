package com.prette.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.prette.entities.Nazioni;
import com.prette.repo.NazioniDAO;

@Service
public class ServiceNazioni implements NazioniIMP {
	
	@Autowired
	private NazioniDAO dao;

	@Override
	public List<Nazioni> getNazioni() {
		// TODO Auto-generated method stub
		return dao.findAll();
	}

	@Override
	public List<Nazioni> getNazioniByName(String nome) {
		// TODO Auto-generated method stub
		return dao.findBynomeContaining(nome);
	}
	
	public List<String> getRegioniDistinte() {
        return dao.findDistinctRegioni();
    }

}
