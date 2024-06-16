document.addEventListener("DOMContentLoaded", function () {
    var sceltaModalita = document.getElementById("menu-mod");
    var sceltaContinente = document.getElementById("menu-cont");
    const URL = "api/continenti";

    // Effettua una chiamata FETCH per ottenere i dati delle regioni dal backend
    fetch(URL)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Errore HTTP ${response.status} - ${response.statusText}`);
            }
            return response.json();
        })
        .then((data) => {
            // Popola il menu a tendina dell'elemento con l'id menu-cont con i nomi dei continenti
            data.forEach((continente) => {
                var option = document.createElement("option");
                option.text = continente;
                option.value = continente;
                sceltaContinente.appendChild(option);
            });

            // Aggiungi un evento di click al menu a tendina per reindirizzare a domande.html
            sceltaContinente.addEventListener("change", function () {
                var selectedCont = sceltaContinente.value;
                var selectedMod = sceltaModalita.value;
                // Reindirizza l'utente a domande.html con il parametro continente
                window.location.href = `domande.html?continente=${encodeURIComponent(selectedCont)}&tipo=${encodeURIComponent(selectedMod)}`;
            });
        })
        .catch((error) => {
            console.error("Errore durante la richiesta FETCH:", error);
        });
});
