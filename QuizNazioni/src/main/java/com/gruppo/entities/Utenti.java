package com.gruppo.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "users")
public class Utenti {

	@Id
	private int id;
	private String username;
	private String password;

	private int quiz_tentati;
	private int quiz_passati;
	private int quiz_bocciati;
	private int risposte_corrette;
	private int risposte_errate;
	private int partite_memory;
	private int record_memory;
	
	



	// getters e setters

	public int getQuiz_tentati() {
		return quiz_tentati;
	}

	public void setQuiz_tentati(int quiz_tentati) {
		this.quiz_tentati = quiz_tentati;
	}

	public int getQuiz_passati() {
		return quiz_passati;
	}

	public void setQuiz_passati(int quiz_passati) {
		this.quiz_passati = quiz_passati;
	}

	public int getQuiz_bocciati() {
		return quiz_bocciati;
	}

	public void setQuiz_bocciati(int quiz_bocciati) {
		this.quiz_bocciati = quiz_bocciati;
	}

	public int getRisposte_corrette() {
		return risposte_corrette;
	}

	public void setRisposte_corrette(int risposte_corrette) {
		this.risposte_corrette = risposte_corrette;
	}

	public int getRisposte_errate() {
		return risposte_errate;
	}

	public void setRisposte_errate(int risposte_errate) {
		this.risposte_errate = risposte_errate;
	}

	public int getPartite_memory() {
		return partite_memory;
	}

	public void setPartite_memory(int partite_memory) {
		this.partite_memory = partite_memory;
	}

	public int getRecord_memory() {
		return record_memory;
	}

	public void setRecord_memory(int record_memory) {
		this.record_memory = record_memory;
	}

	
	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

}
