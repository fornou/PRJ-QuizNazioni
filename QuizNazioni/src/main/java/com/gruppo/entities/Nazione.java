package com.gruppo.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="nazioniquiz")
public class Nazione {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@Column(length = 2)
	private String alphacod;
	
	private String nome;
	private String regione;
	private String capitale;
	private int popolazione;
	private String img;
	
	public String getAlphacode() {
		return alphacod;
	}
	public void setAlphacode(String alphacod) {
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
