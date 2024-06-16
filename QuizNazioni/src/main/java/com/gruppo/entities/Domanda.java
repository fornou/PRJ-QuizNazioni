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

            switch (tipo) {
                case "capNaz": // Domanda -> nazione
                    this.risposte.add(temp.getCapitale()); // risposte -> capitali
                    break;
                case "bandNaz": // Domanda -> nazione
                    this.risposte.add(temp.getImg()); // Risposte -> immagini bandiere
                    break;
                case "nazBand": // Domanda -> immagine bandiera
                    this.risposte.add(temp.getNome()); // risposte -> nazioni
                    break;

                default:
                    this.risposte.add("errore");
                    break;
            }

            if (i == sceltaCorretta) {
                switch (tipo) {
                    case "capNaz":
                        this.nomeNazione = temp.getNome();
                        this.corretta = temp.getCapitale();
                        break;
                    case "bandNaz":
                        this.nomeNazione = temp.getNome();
                        this.corretta = temp.getImg();
                        break;
                    case "nazBand":
                        this.nomeNazione = temp.getImg();
                        this.corretta = temp.getNome();
                        break;

                    default:
                        this.nomeNazione = "errore";
                        this.corretta = "errore";
                        break;
                }

            }

            lista.remove(n);
        }

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
