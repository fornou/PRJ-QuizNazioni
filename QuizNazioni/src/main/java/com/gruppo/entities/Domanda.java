package com.gruppo.entities;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

public class Domanda {

    private String nomeNazione;
    private List<String> risposte;
    private String corretta;
    private boolean check;

    public Domanda(List<Nazione> lista, boolean bandiere) {
        Random rand = new Random();
        risposte = new ArrayList<>();

        int sceltaCorretta = rand.nextInt(4);

        for (int i = 0; i < 4; i++) {
            int n = rand.nextInt(lista.size());
            Nazione temp = lista.get(n);

            if (!bandiere) {
                this.risposte.add(temp.getCapitale());
            } else {
                this.risposte.add(temp.getImg());
            }
            
            if (i == sceltaCorretta) {
                this.nomeNazione = temp.getNome();

                if (!bandiere) {
                    this.corretta = temp.getCapitale();
                } else {
                    this.corretta = temp.getImg();
                }

            }

            lista.remove(n);
        }

    }

    public boolean checkRisposta(String risposta) {
        if (risposta == this.corretta) {
            this.check = true;
            return true;
        }

        this.check = false;
        return false;
    }

    public boolean isCheck() {
        return check;
    }

    public void setCheck(boolean check) {
        this.check = check;
    }

    public String getNomeNazione() {
        return nomeNazione;
    }

    public void setNomeNazione(String nomeNazione) {
        this.nomeNazione = nomeNazione;
    }

    public List<String> getRisposte() {
        return risposte;
    }

    public void setRisposte(List<String> risposte) {
        this.risposte = risposte;
    }

    public String getCorretta() {
        return corretta;
    }

    public void setCorretta(String corretta) {
        this.corretta = corretta;
    }

}
