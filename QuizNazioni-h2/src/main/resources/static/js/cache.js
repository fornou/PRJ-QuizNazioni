document.addEventListener("DOMContentLoaded", function () {
    const datiRecuperati = localStorage.getItem("datiUtente");

    if (datiRecuperati) {
        const dati = JSON.parse(datiRecuperati);
        console.log("Dati recuperati: " + dati);
        console.log("quiz_tentati: " + dati["quiz_tentati"]);
        console.log("quiz_passati: " + dati["quiz_passati"]);
        console.log("risposte_corrette: " + dati["risposte_corrette"]);
        console.log("risposte_errate: " + dati["risposte_errate"]);
        console.log("partite_memory: " + dati["partite_memory"]);
        console.log("record_memory: " + dati["record_memory"]);
    } else {
        console.log("Nessun dato trovato");

        fetch("/api/getStat")
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Errore HTTP ${response.status} - ${response.statusText}`);
                }
                return response.json();
            })
            .then((data) => {
                const datiStringa = JSON.stringify(data);

                localStorage.setItem("datiUtente", datiStringa);

                console.log("Caricati dati azzerati");
            })
            .catch((error) => {
                console.error("Errore durante la richiesta FETCH:", error);
            });
    }
});
