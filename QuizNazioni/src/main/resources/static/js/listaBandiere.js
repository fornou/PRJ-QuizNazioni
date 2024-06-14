const URL = "/api/nazioni";

fetch(URL)
    .then((risposta) => risposta.json())
    .then((listaNazioni) => {
        const continenti = {};

        // Creare i contenitori per ciascun continente
        listaNazioni.forEach((nazione) => {
            if (!continenti[nazione.regione]) {
                continenti[nazione.regione] = document.createElement("div");
                continenti[nazione.regione].classList.add("continente");
                const titolo = document.createElement("h2");
                titolo.textContent = nazione.regione;
                continenti[nazione.regione].appendChild(titolo);
                document.body.appendChild(continenti[nazione.regione]);
            }
            const img = document.createElement("img");
            img.src = nazione.img;
            img.alt = nazione.nome;
            img.classList.add("resize-img"); // Aggiungi la classe CSS
            continenti[nazione.regione].appendChild(img);
        });
    });
