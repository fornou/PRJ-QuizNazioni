document.addEventListener("DOMContentLoaded", function () {
    fetch("/api/getStat")
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Errore HTTP ${response.status} - ${response.statusText}`);
            }
            return response.json();
        })
        .then((data) => {
            const quiz_tentati = document.getElementById("quiz_tentati");
            const quiz_passati = document.getElementById("quiz_passati");
            const quiz_bocciati = document.getElementById("quiz_bocciati");
            const risposte_corrette = document.getElementById("risposte_corrette");
            const risposte_errate = document.getElementById("risposte_errate");
            const partite_memory = document.getElementById("partite_memory");
            const record_memory = document.getElementById("record_memory");

            const dati = data;

            quiz_tentati.textContent = dati["quiz_tentati"];
            quiz_passati.textContent = dati["quiz_passati"] + "/" + dati["quiz_tentati"];
            quiz_bocciati.textContent = dati["quiz_tentati"] - dati["quiz_passati"] + "/" + dati["quiz_tentati"];
            risposte_corrette.textContent = dati["risposte_corrette"] + "/" + (dati["risposte_corrette"] + dati["risposte_errate"]);
            risposte_errate.textContent = dati["risposte_errate"] + "/" + (dati["risposte_corrette"] + dati["risposte_errate"]);
            partite_memory.textContent = dati["partite_memory"];
            if (dati["record_memory"] === 100000) {
                record_memory.textContent = 0;
            } else {
                record_memory.textContent = dati["record_memory"];
            }
        })
        .catch((error) => {
            console.error("Errore durante la richiesta FETCH:", error);
        });
});
