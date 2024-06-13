package com.gruppo.controllers;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gruppo.entities.Nazione;
import com.gruppo.services.NazioniService;

@RestController
@RequestMapping("api")
public class NazioneREST {
	
	@Autowired
	NazioniService service;
	
	@GetMapping("nazioni")
	List<Nazione>getNazioni(){
		return service.getNazioni();
	}
	
	@GetMapping("nazioni/{code}")
    public ResponseEntity<Nazione> getCountryByCode(@PathVariable String code) {
        Optional<Nazione> country = service.getNazioneByCode(code);
        if (country.isPresent()) {
            return ResponseEntity.ok(country.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }
	
	@GetMapping("nazioni/{minimo}/{massimo}")
	List<Nazione> getNazioneByPopolazione(@PathVariable("minimo") int min,@PathVariable("massimo") int max){
		return service.getNazioniByPopolazione(min, max);
	}
	
	@GetMapping("continenti")
	private List<String> getRegioniDistinte(){
		 return service.getRegioniDistinte();
	}
}