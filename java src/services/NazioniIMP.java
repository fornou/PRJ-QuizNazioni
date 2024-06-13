package com.prette.services;

import java.util.List;

import com.prette.entities.Nazioni;

public interface NazioniIMP {
	
	List<Nazioni> getNazioni();
	List<Nazioni> getNazioniByName(String name);
	
}
