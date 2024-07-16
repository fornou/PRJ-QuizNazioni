package com.gruppo.entities;

public class StatisticheDTO {

	private int quiz_tentati;
	private int quiz_passati;
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

}
