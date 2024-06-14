package com.gruppo.controllers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gruppo.entities.Domanda;
import com.gruppo.entities.Nazione;
import com.gruppo.entities.Quiz;
import com.gruppo.services.NazioniService;

@RestController
@RequestMapping("api")
public class NazioneREST {

	@Autowired
	private NazioniService service;

	@GetMapping("nazioni")
	public List<Nazione> getNazioni() {
		return service.getNazioni();
	}

	@GetMapping("nazioni/alphacod/{code}")
	public ResponseEntity<Nazione> getCountryByCode(@PathVariable String code) {
		Nazione country = service.getNazioneByCode(code);
		if (country == null) {
			new ResponseEntity<Nazione>(new Nazione(), HttpStatus.NOT_FOUND);
		}

		return new ResponseEntity<Nazione>(country, HttpStatus.OK);
	}

	@GetMapping("nazioni/regione/{regione}")
	public ResponseEntity<List<Nazione>> getNazioneByRegione(@PathVariable String regione) {
		List<Nazione> nazioneByRegione = service.getNazioniByRegione(regione);

		if (nazioneByRegione == null) {
			new ResponseEntity<List<Nazione>>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<List<Nazione>>(nazioneByRegione, HttpStatus.OK);
	}

	@GetMapping("nazioni/popolazione/{minimo}/{massimo}")
	public List<Nazione> getNazioneByPopolazione(@PathVariable("minimo") int min, @PathVariable("massimo") int max) {
		return service.getNazioniByPopolazione(min, max);
	}

	@GetMapping("continenti")
	private List<String> getRegioniDistinte() {
		return service.getRegioniDistinte();
	}

	@GetMapping("nazioni/{regione}/domanda")
	public ResponseEntity<Domanda> createDomanda(@PathVariable String regione) {
		List<Nazione> nazioniByRegione = service.getNazioniByRegione(regione);

		Domanda domanda = new Domanda(nazioniByRegione);

		return new ResponseEntity<Domanda>(domanda, HttpStatus.OK);
	}

	@GetMapping("nazioni/{regione}/domande")
	public ResponseEntity<Quiz> getListaDomande(@PathVariable String regione) {

		List<Domanda> listaDomande = new ArrayList<Domanda>();

		for (int i = 0; i < 10; i++) {
			ResponseEntity<Domanda> response = createDomanda(regione);
			if (response.getStatusCode() == HttpStatus.OK) {
				Domanda domanda = response.getBody();
				listaDomande.add(domanda);
			}
		}

		Quiz quiz = new Quiz(listaDomande, 0);

		return new ResponseEntity<>(quiz, HttpStatus.OK);
	}

}