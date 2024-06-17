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

	//---------------------------------------------------------
	//bisogna vedere bene il mappign con le response entities per questi due metodi siccome poi interferiscono con altri 
	
	//quuesto metoodo fatto con la response entities non fa funzionare i vari js 
//	@GetMapping("continenti")
//	private ResponseEntity<List<String>>  getContinenti() {
//		List<String> continenti =  service.getContinenti();
//		if(continenti == null || continenti.isEmpty()) {
//			new ResponseEntity<List<String>>(HttpStatus.NOT_FOUND);
//		}
//		return new ResponseEntity<List<String>>(continenti,HttpStatus.FOUND);
//	}
	
	@GetMapping("continenti")
	private List<String> getContinenti(){
		return service.getContinenti();
	}
	
	@GetMapping("nazioni")
	public List<Nazione> getNazioni() {
		return service.getNazioni();
	}
	//---------------------------------------------------------
	@GetMapping("nazioni/alphacod/{code}")
	public ResponseEntity<Nazione> getCountryByCode(@PathVariable String code) {
		Nazione country = service.getNazioneByCode(code);
		if (country == null) {
			new ResponseEntity<Nazione>(new Nazione(), HttpStatus.NOT_FOUND);
		}

		return new ResponseEntity<Nazione>(country, HttpStatus.OK);
	}

	@GetMapping("nazioni/img/{img}")
	public ResponseEntity<Nazione>  getNazioneByImg(@PathVariable String img) {
		Nazione immagine = service.getNazioneByImg(img);
		if(immagine == null) {
			new ResponseEntity<Nazione>(new Nazione(),HttpStatus.NOT_FOUND);
		}
		
		return new ResponseEntity<Nazione>(immagine,HttpStatus.OK);
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
	public ResponseEntity<List<Nazione> > getNazioneByPopolazione(@PathVariable("minimo") int min, @PathVariable("massimo") int max) {
		List<Nazione> minMax =  service.getNazioniByPopolazione(min, max);
		if(minMax == null || minMax.isEmpty()) {
			return new ResponseEntity<List<Nazione>>(HttpStatus.NOT_FOUND);
		}
		
		return new ResponseEntity<List<Nazione>>(minMax,HttpStatus.OK);
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
	
	@GetMapping("nazioni/continente/popolazione/{continente}")
	public ResponseEntity<List<String>> getPopolazioneByContinente(@PathVariable String continente){
		List<String> listaPopo = service.getNomePopolazioneByContinente(continente);
		if(listaPopo == null) {
			new ResponseEntity<List<String>>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<List<String>>(listaPopo,HttpStatus.OK);
	}
	
}