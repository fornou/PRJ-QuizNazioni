package com.gruppo.controllers;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.view.RedirectView;

import com.gruppo.entities.Domanda;
import com.gruppo.entities.Memory;
import com.gruppo.entities.Nazione;
import com.gruppo.entities.NomePopolazioneDTO;
import com.gruppo.entities.Quiz;
import com.gruppo.entities.Utenti;
import com.gruppo.services.NazioniService;
import com.gruppo.services.UtentiService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("api")
public class NazioneREST {

    @Autowired
    private NazioniService service;

    @Autowired
    private UtentiService utentiService;

    // Endpoint per il login
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestParam String username, @RequestParam String password, HttpSession session) {
        Utenti user = utentiService.authenticate(username, password);
        if (user != null) {
            session.setAttribute("user", user);
            return ResponseEntity.ok("Login successful. Redirecting to index.html...");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }
    
    @GetMapping("/logout")
    public void logout(HttpSession session, HttpServletResponse response) throws IOException {
        // Rimuovi l'attributo dell'utente dalla sessione
        session.removeAttribute("user");

        // Invalida la sessione (opzionale)
        session.invalidate();

        // Reindirizza alla pagina di index
        response.sendRedirect("/index.html");
    }


    // Endpoint per verificare se l'utente è autenticato
    @GetMapping("/isLoggedIn")
    public ResponseEntity<String> isLoggedIn(HttpSession session) {
        if (isAuthenticated(session)) {
            return ResponseEntity.ok("User is authenticated.");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User is not authenticated.");
        }
    }

    @GetMapping("continenti")
    private List<String> getContinenti() {
        return service.getContinenti();
    }

    @GetMapping("nazioni")
    public List<Nazione> getNazioni() {
        return service.getNazioni();
    }

    @GetMapping("nazioni/alphacod/{code}")
    public ResponseEntity<Nazione> getCountryByCode(@PathVariable String code, HttpSession session) {
        if (!isAuthenticated(session)) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        Nazione country = service.getNazioneByCode(code);
        if (country == null) {
            return new ResponseEntity<>(new Nazione(), HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(country, HttpStatus.OK);
    }

    @GetMapping("nazioni/img/{img}")
    public ResponseEntity<Nazione> getNazioneByImg(@PathVariable String img, HttpSession session) {
        if (!isAuthenticated(session)) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        Nazione immagine = service.getNazioneByImg(img);
        if (immagine == null) {
            return new ResponseEntity<>(new Nazione(), HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(immagine, HttpStatus.OK);
    }

    @GetMapping("nazioni/continente/{continente}")
    public ResponseEntity<List<Nazione>> getNazioneByContinente(@PathVariable String continente, HttpSession session) {
        if (!isAuthenticated(session)) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        List<Nazione> nazioniByContinente = service.getNazioniByContinente(continente);
        if (nazioniByContinente == null || nazioniByContinente.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(nazioniByContinente, HttpStatus.OK);
    }

    @GetMapping("nazioni/popolazione/{minimo}/{massimo}")
    public ResponseEntity<List<Nazione>> getNazioneByPopolazione(@PathVariable("minimo") int min,
            @PathVariable("massimo") int max, HttpSession session) {
        if (!isAuthenticated(session)) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        List<Nazione> minMax = service.getNazioniByPopolazione(min, max);
        if (minMax == null || minMax.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(minMax, HttpStatus.OK);
    }

    @GetMapping("nazioni/memory")
    public ResponseEntity<Memory> createMemory(HttpSession session) {
        if (!isAuthenticated(session)) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        List<Nazione> listaNazioni = getNazioni();
        Memory memory = new Memory(listaNazioni);
        memory.getRisposteMescolate();
        return new ResponseEntity<>(memory, HttpStatus.OK);
    }

    @GetMapping("nazioni/domandaCasuale")
    public ResponseEntity<Domanda> createDomandaCasuale(HttpSession session) {
        if (!isAuthenticated(session)) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        List<Nazione> listaNazioni = getNazioni();
        Domanda domanda = new Domanda(listaNazioni);
        return new ResponseEntity<>(domanda, HttpStatus.OK);
    }

    @GetMapping("nazioni/{continente}/domanda/{modalita}")
    public ResponseEntity<Domanda> createDomanda(@PathVariable String continente, @PathVariable String modalita,
            HttpSession session) {
        if (!isAuthenticated(session)) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        List<Nazione> listaNazioni;
        if (!continente.equalsIgnoreCase("mondo")) {
            listaNazioni = service.getNazioniByContinente(continente);
        } else {
            listaNazioni = getNazioni();
        }
        Domanda domanda = new Domanda(listaNazioni, modalita);
        return new ResponseEntity<>(domanda, HttpStatus.OK);
    }

    @GetMapping("nazioni/{continente}/domande/{modalita}")
    public ResponseEntity<Quiz> getListaDomande(@PathVariable String continente, @PathVariable String modalita,
            HttpSession session) {
        if (!isAuthenticated(session)) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        List<Domanda> listaDomande = new ArrayList<Domanda>();
        while (listaDomande.size() < 10) {
            ResponseEntity<Domanda> response = createDomanda(continente, modalita, session);
            if (response.getStatusCode() == HttpStatus.OK) {
                Domanda domanda = response.getBody();
                boolean exists = listaDomande.stream()
                        .anyMatch(q -> q.getNomeNazione().equals(domanda.getNomeNazione()));
                if (!exists) {
                    listaDomande.add(domanda);
                }
            }
        }
        Quiz quiz = new Quiz(listaDomande, 0);
        return new ResponseEntity<>(quiz, HttpStatus.OK);
    }
    @GetMapping("/ripasso")
    public ResponseEntity<ClassPathResource> getPaginaRipasso() {
        ClassPathResource resource = new ClassPathResource("/static/ripasso.html");
        return ResponseEntity.ok(resource);
    }

    @GetMapping("/ripasso/domande")
    public ResponseEntity<ClassPathResource> getPaginaRipassoDomande() {
        ClassPathResource resource = new ClassPathResource("/static/domandeRipasso.html");
        return ResponseEntity.ok(resource);
    }

    @GetMapping("/memory")
    public ResponseEntity<ClassPathResource> getPaginaMemory() {
        ClassPathResource resource = new ClassPathResource("/static/memory.html");
        return ResponseEntity.ok(resource);
    }

    @GetMapping("/bandiere")
    public ResponseEntity<ClassPathResource> getPaginaBandiere() {
        ClassPathResource resource = new ClassPathResource("/static/bandiere.html");
        return ResponseEntity.ok(resource);
    }

    @GetMapping("/statistiche")
    public ResponseEntity<ClassPathResource> getPaginaStatistiche() {
        ClassPathResource resource = new ClassPathResource("/static/statistiche.html");
        return ResponseEntity.ok(resource);
    }
    @GetMapping("/login")
    public ResponseEntity<ClassPathResource> getPaginaLogin() {
        ClassPathResource resource = new ClassPathResource("/static/login.html");
        return ResponseEntity.ok(resource);
    }
    @GetMapping("/user")
    public ResponseEntity<ClassPathResource> getPaginaUser() {
        ClassPathResource resource = new ClassPathResource("/static/user.html");
        return ResponseEntity.ok(resource);
    }

//    @GetMapping("/index")
//    public ResponseEntity<ClassPathResource> getIndexPage() {
//        ClassPathResource resource = new ClassPathResource("/static/index.html");
//        return ResponseEntity.ok(resource);
//    }

    @GetMapping("nazioni/continente/popolazione/{continente}")
    public ResponseEntity<List<NomePopolazioneDTO>> getPopolazioneByContinente(@PathVariable String continente,
            HttpSession session) {
        if (!isAuthenticated(session)) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        List<NomePopolazioneDTO> listaPopo = service.getNomePopolazioneByContinente(continente);
        if (listaPopo == null || listaPopo.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(listaPopo, HttpStatus.OK);
    }

    @GetMapping("/protected")
    public ResponseEntity<String> protectedEndpoint(HttpSession session) {
        if (isAuthenticated(session)) {
            return ResponseEntity.ok("You are authenticated and can access this endpoint.");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Please login first.");
        }
    }

    private boolean isAuthenticated(HttpSession session) {
        return session.getAttribute("user") != null;
    }
    
  
}
