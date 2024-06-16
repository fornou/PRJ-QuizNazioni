package com.gruppo.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gruppo.entities.Nazione;
import com.gruppo.repos.NazioneDAO;

@Service
public class NazioniServiceImpl implements NazioniService {

	@Autowired
	private NazioneDAO dao;

	@Override
	public List<Nazione> getNazioni() {
		return dao.findAll();
	}

	@Override
	public List<Nazione> getNazioniByPopolazione(int min, int max) {
		return dao.findByPopolazioneBetween(min, max);
	}

	@Override
	public Nazione getNazioneByCode(String code) {
		return dao.findById(code).get();
	}

	@Override
	public List<Nazione> getNazioneByNome(String nome) {
		return dao.findByNomeContaining(nome);
	}

	@Override
	public List<Nazione> getNazioniByContinente(String continente) {
		return dao.findByContinente(continente);
	}

	@Override
	public List<String> getContinenti() {
		return dao.findDistinctContinente();
	}

	@Override
	public Nazione getNazioneByImg(String img) {
		return dao.findByImg(img);
	}

}
