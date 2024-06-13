package com.prette.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.prette.entities.Nazioni;
import com.prette.services.ServiceNazioni;


@RestController
@RequestMapping("api")
public class NazioniREST {
	
	@Autowired
	private ServiceNazioni service;

	@GetMapping("nazioni")
	public List<Nazioni> getNazioni(){
		return service.getNazioni();
	}
	
	 @GetMapping("continenti")
	 private List<String> getRegioniDistinte(){
		 return service.getRegioniDistinte();
	 }
	    
}
