package com.gruppo.repos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.gruppo.entities.Nazione;

public interface NazioneDAO extends JpaRepository<Nazione, String>{
	
	@Query(value = "select distinct(regione) from nazioniquiz", nativeQuery = true)
    public List<String> findDistinctRegioni();
	
	public List<Nazione> findByPopolazioneBetween(double min, double max);
	public List<Nazione> findByRegioneContaining(String nome);
	
	public List<Nazione> findByNomeContaining(String nome);
	
}

