package com.gruppo.repos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.gruppo.entities.Nazione;

public interface NazioneDAO extends JpaRepository<Nazione, String> {

	@Query(value = "select distinct(continente) from nazioniquiz", nativeQuery = true)
	public List<String> findDistinctContinente();

	public List<Nazione> findByPopolazioneBetween(double min, double max);

	public List<Nazione> findByContinenteContaining(String continente);

	public List<Nazione> findByNomeContaining(String nome);

	public Nazione findByImg(String img);

	public List<Nazione> findByContinente(String continente);

}
