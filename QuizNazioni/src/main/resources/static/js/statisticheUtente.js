document.addEventListener("DOMContentLoaded", function () {
    const datiUtente = localStorage.getItem("datiUtente");

    if (datiUtente) {
        const quiz_tentati = document.getElementById("quiz_tentati");
        const quiz_passati = document.getElementById("quiz_passati");
        const quiz_bocciati = document.getElementById("quiz_bocciati");
        const risposte_corrette = document.getElementById("risposte_corrette");
        const risposte_errate = document.getElementById("risposte_errate");
        const partite_memory = document.getElementById("partite_memory");
        const record_memory = document.getElementById("record_memory");

        const dati = JSON.parse(datiUtente);

        quiz_tentati.textContent = dati['quiz_tentati']
        quiz_passati.textContent = dati['quiz_passati']
        quiz_bocciati.textContent = (dati['quiz_tentati'] - dati['quiz_passati'])
        risposte_corrette.textContent = dati['risposte_corrette']
        risposte_errate.textContent = dati['risposte_errate']
        partite_memory.textContent = dati['partite_memory']
        record_memory.textContent = dati['record_memory']
    } else {
        console.log("Errore nel recupero dei dati utente");
    }
});
