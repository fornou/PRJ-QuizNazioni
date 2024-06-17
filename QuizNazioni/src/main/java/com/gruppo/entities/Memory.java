package com.gruppo.entities;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.Collections;

public class Memory {

    private List<String> risposte;

    public Memory(List<Nazione> lista){
        Random rand = new Random();
        risposte = new ArrayList<>();
        //carica in una lista le immagini del memory a coppie
        for (int i = 0; i < 8; i++) {
            int n = rand.nextInt(lista.size());
            Nazione temp = lista.get(n);

            this.risposte.add(temp.getImg());
            this.risposte.add(temp.getImg());

            lista.remove(n);
        }
    }

    public List<String> getRisposteMescolate(){
        Collections.shuffle(risposte);
        return risposte;
    }
}
