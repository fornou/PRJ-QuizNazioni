package com.gruppo.entities;

import java.util.List;

public class Quiz {

	private List<Domanda> listaDomande;

	public Quiz(List<Domanda> listaDomande, int punteggio) {
		this.listaDomande = listaDomande;
		this.punteggio = punteggio;
	}

	private int punteggio;

	public List<Domanda> getListaDomande() {
		return listaDomande;
	}

	public void setListaDomande(List<Domanda> listaDomande) {
		this.listaDomande = listaDomande;
	}

	public int getPunteggio() {
		return punteggio;
	}

	public void setPunteggio(int punteggio) {
		this.punteggio = punteggio;
	}

	public void addDomanda(Domanda d) {
		this.listaDomande.add(d);
	}

}
