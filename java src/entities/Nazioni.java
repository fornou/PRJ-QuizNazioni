package com.prette.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "nazioniquiz")
public class Nazioni {

	
	@Id
	private String alphacod;
	
	private String nome;
	private String regione;
	private String capitale;
	private int popolazione;
	private String img;
	
	//getters e setters
	public String getAlphacod() {
		return alphacod;
	}
	public void setAlphacod(String alphacod) {
		this.alphacod = alphacod;
	}
	public String getNome() {
		return nome;
	}
	public void setNome(String nome) {
		this.nome = nome;
	}
	public String getRegione() {
		return regione;
	}
	public void setRegione(String regione) {
		this.regione = regione;
	}
	public String getCapitale() {
		return capitale;
	}
	public void setCapitale(String capitale) {
		this.capitale = capitale;
	}
	public int getPopolazione() {
		return popolazione;
	}
	public void setPopolazione(int popolazione) {
		this.popolazione = popolazione;
	}
	public String getImg() {
		return img;
	}
	public void setImg(String img) {
		this.img = img;
	}
	
	
	
	
}
