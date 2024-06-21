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

        const datiUtente = {
            quiz_tentati: 0,
            quiz_passati: 0,
            risposte_corrette: 0,
            risposte_errate: 0,
            partite_memory: 0,
            record_memory: 0,
        };

        const datiStringa = JSON.stringify(datiUtente);

        localStorage.setItem("datiUtente", datiStringa);

        console.log("Caricati dati azzerati");
    }
});
