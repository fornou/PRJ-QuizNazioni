package com.gruppo.entities;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

public class Domanda {

    private String nomeNazione;
    private List<String> risposte;
    private String corretta;
    private boolean check;

    public Domanda(List<Nazione> lista, String tipo) {
        Random rand = new Random();
        risposte = new ArrayList<>();

        int sceltaCorretta = rand.nextInt(4);

        for (int i = 0; i < 4; i++) {
        	
            int n = rand.nextInt(lista.size());
            Nazione temp = lista.get(n);
            
            if (tipo.equals("capNaz")) { //Domanda -> nazione
                this.risposte.add(temp.getCapitale()); //risposte -> capitali
                
            } else if(tipo.equals("bandNaz")){ //Domanda -> nazione
                this.risposte.add(temp.getImg()); //Risposte -> immagini bandiere
                
            } else if(tipo.equals("nazBand")) { //Domanda -> immagine bandiera
            	this.risposte.add(temp.getNome()); //risposte -> nazioni
            }
            
            if (i == sceltaCorretta) {
                this.nomeNazione = temp.getNome();

                if (tipo.equals("capNaz")) {
                    this.corretta = temp.getCapitale();
                    
                } else if(tipo.equals("bandNaz")){
                    this.corretta = temp.getImg();
                    
                }else if (tipo.equals("nazBand")) {
                    this.nomeNazione = temp.getImg();
                	this.corretta =temp.getNome();
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
