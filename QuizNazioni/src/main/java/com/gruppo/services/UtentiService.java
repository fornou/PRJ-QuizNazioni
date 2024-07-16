package com.gruppo.services;

import java.util.Set;

import com.gruppo.entities.StatisticheDTO;
import com.gruppo.entities.Utenti;

public interface UtentiService {

	public Utenti authenticate(String username, String password);

	public Utenti verifyUser(String username, String password);

	public Utenti insertUsers(String username, String password);

	public Set<String> getUtenti();

	public Utenti salvaStat(StatisticheDTO dto, int id);

	public StatisticheDTO getStat(int id);

}
