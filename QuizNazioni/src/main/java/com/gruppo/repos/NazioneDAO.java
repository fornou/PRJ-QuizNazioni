package com.gruppo.repos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.gruppo.entities.Nazione;

public interface NazioneDAO extends JpaRepository<Nazione, String>{
	
	@Query(value = "select distinct(regione) from nazioniquiz", nativeQuery = true)
    List<String> findDistinctRegioni();
	
	List<Nazione> findByPopolazioneBetween(double min, double max);
	List<Nazione> findByNomeContaining(String nome);
}

