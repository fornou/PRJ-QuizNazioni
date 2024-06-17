package com.gruppo.entities;

public class NomePopolazioneDTO {

    private String nome;
    private int popolazione;

    public NomePopolazioneDTO(String nome, int popolazione) {
        this.nome = nome;
        this.popolazione = popolazione;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public int getPopolazione() {
        return popolazione;
    }

    public void setPopolazione(int popolazione) {
        this.popolazione = popolazione;
    }

}
