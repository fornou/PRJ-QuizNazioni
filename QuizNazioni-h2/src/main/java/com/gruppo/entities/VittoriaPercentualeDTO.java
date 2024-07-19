package com.gruppo.entities;


public class VittoriaPercentualeDTO {
    
    private String username;
    private int quizTentati;
    private int quizPassati;
    private double vittoria;

    
    public VittoriaPercentualeDTO(String username, int quizTentati, int quizPassati, double vittoria) {
        this.username = username;
        this.quizTentati = quizTentati;
        this.quizPassati = quizPassati;
        this.vittoria = vittoria;
    }
    
    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    public int getQuizTentati() {
        return quizTentati;
    }
    public void setQuizTentati(int quizTentati) {
        this.quizTentati = quizTentati;
    }
    public int getQuizPassati() {
        return quizPassati;
    }
    public void setQuizPassati(int quizPassati) {
        this.quizPassati = quizPassati;
    }
    public double getVittoria() {
        return vittoria;
    }
    public void setVittoria(double vittoria) {
        this.vittoria = vittoria;
    }

    

}
