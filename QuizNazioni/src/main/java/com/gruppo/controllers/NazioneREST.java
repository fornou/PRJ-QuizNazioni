package com.gruppo.controllers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
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

	@GetMapping("continenti")
	private List<String> getContinenti() {
		return service.getContinenti();
	}

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

	@GetMapping("nazioni/img/{img}")
	public Nazione getNazioneByImg(@PathVariable String img) {
		return service.getNazioneByImg(img);
	}

	@GetMapping("nazioni/continente/{continente}")
	public ResponseEntity<List<Nazione>> getNazioneByContinente(@PathVariable String continente) {
		List<Nazione> nazioniByContinente = service.getNazioniByContinente(continente);

		if (nazioniByContinente == null || nazioniByContinente.isEmpty()) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<>(nazioniByContinente, HttpStatus.OK);
	}

	@GetMapping("nazioni/popolazione/{minimo}/{massimo}")
	public List<Nazione> getNazioneByPopolazione(@PathVariable("minimo") int min, @PathVariable("massimo") int max) {
		return service.getNazioniByPopolazione(min, max);
	}

	@GetMapping("nazioni/{continente}/domanda/{modalita}")
	public ResponseEntity<Domanda> createDomanda(@PathVariable String continente, @PathVariable String modalita) {
		List<Nazione> listaNazioni;

		if (!continente.equalsIgnoreCase("mondo")) {
			listaNazioni = service.getNazioniByContinente(continente);
		} else {
			listaNazioni = getNazioni();
		}

		Domanda domanda = new Domanda(listaNazioni, modalita);

		return new ResponseEntity<Domanda>(domanda, HttpStatus.OK);
	}

	@GetMapping("nazioni/{continente}/domande/{modalita}")
	public ResponseEntity<Quiz> getListaDomande(@PathVariable String continente, @PathVariable String modalita) {

		List<Domanda> listaDomande = new ArrayList<Domanda>();

		for (int i = 0; i < 10; i++) {
			ResponseEntity<Domanda> response = createDomanda(continente, modalita);
			if (response.getStatusCode() == HttpStatus.OK) {
				Domanda domanda = response.getBody();
				listaDomande.add(domanda);
			}
		}

		Quiz quiz = new Quiz(listaDomande, 0);

		return new ResponseEntity<>(quiz, HttpStatus.OK);
	}

	@GetMapping("ripasso")
	public ResponseEntity<ClassPathResource> getPaginaRipasso() {
		ClassPathResource resurce = new ClassPathResource("/static/ripasso.html");
		return ResponseEntity.ok(resurce);
	}
}