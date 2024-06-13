package com.gruppo.services;

import java.util.List;
import java.util.Optional;

import com.gruppo.entities.Nazione;

public interface NazioniService {
	
	public List<Nazione> getNazioni();
	public List<Nazione> getNazioniByPopolazione(int min, int max);
	public Optional<Nazione> getNazioneByCode(String code);
	public List<Nazione> getNazioneByNome(String nome);
	public List<String> getRegioniDistinte();
	
}
