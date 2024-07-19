document.addEventListener("DOMContentLoaded", function () {
    fetch("/api/vittorie")
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Errore HTTP ${response.status} - ${response.statusText}`);
            }
            return response.json();
        })
        .then((data) => {
            const tabella = document.getElementById("classifica");

            // Ordina l'array `data` in base a `quizTentati` in modo decrescente
            data.sort((a, b) => b.quizTentati - a.quizTentati);

            // Inizializza un contatore
            let c = 0;

            // Itera attraverso l'array ordinato
            for (let i = 0; i < data.length; i++) {
                let utente = data[i];
                if (c != 5 && utente.username != "") {
                    let riga = `<tr class="table-dark">
                        <td>${utente.username}</td>
                        <td>${Math.round(utente.vittoria)}%</td>
                        <td>${utente.quizTentati}</td>
                        <td>${utente.quizPassati}</td>
                        </tr>`;

                    tabella.innerHTML += riga;
                    c++;
                }
            }
        })
        .catch((error) => {
            alert("Errore nel salvataggio dei dati nel db: " + error.message);
        });
});
