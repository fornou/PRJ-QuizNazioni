package com.gruppo.services;

import java.util.List;

import com.gruppo.entities.Nazione;
import com.gruppo.entities.NomePopolazioneDTO;

public interface NazioniService {

	public List<Nazione> getNazioni();

	public List<String> getContinenti();

	public List<Nazione> getNazioniByPopolazione(int min, int max);

	public Nazione getNazioneByCode(String code);

	public Nazione getNazioneByImg(String img);

	public List<Nazione> getNazioneByNome(String nome);

	public List<Nazione> getNazioniByContinente(String continente);

	public List<NomePopolazioneDTO> getNomePopolazioneByContinente(String continente);

}
