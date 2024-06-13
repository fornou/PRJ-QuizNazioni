package com.gruppo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
	private NazioniService service;
	
	@GetMapping("nazioni")
	public List<Nazione>getNazioni(){
		return service.getNazioni();
	}
	
	@GetMapping("nazioni/{code}")
    public ResponseEntity<Nazione> getCountryByCode(@PathVariable String code) {
        Nazione country = service.getNazioneByCode(code);
        if (country == null) {
            new ResponseEntity<Nazione>(new Nazione(), HttpStatus.NOT_FOUND);
        }

		return new ResponseEntity<Nazione>(country, HttpStatus.OK);
    }
	
	@GetMapping("nazioni/{minimo}/{massimo}")
	public List<Nazione> getNazioneByPopolazione(@PathVariable("minimo") int min,@PathVariable("massimo") int max){
		return service.getNazioniByPopolazione(min, max);
	}
	
	@GetMapping("continenti")
	private List<String> getRegioniDistinte(){
		 return service.getRegioniDistinte();
	}
	
}