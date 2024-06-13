package com.prette.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.prette.entities.Nazioni;

public interface NazioniDAO extends JpaRepository<Nazioni, String> {
	
	List<Nazioni> findBynomeContaining(String nome);
	
	@Query(value = "select distinct(regione) from nazioniquiz",nativeQuery = true)
    List<String> findDistinctRegioni();

}
