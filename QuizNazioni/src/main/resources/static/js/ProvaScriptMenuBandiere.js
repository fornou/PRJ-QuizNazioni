/**
 * 
 */

document.addEventListener("DOMContentLoaded", function() {
    var dropdown = document.getElementById("bandiereDropdown");

    // Effettua una chiamata FETCH per ottenere i dati delle regioni dal backend
    const URL = "api/continenti";
    fetch(URL)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Errore HTTP ${response.status} - ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            // Popola il menu a tendina con i dati ottenuti
            data.forEach(regione => {
                var option = document.createElement("option");
                option.text = regione;
                option.value = regione;
                dropdown.appendChild(option);
            });

            // Aggiungi un evento di click al menu a tendina per reindirizzare a domande.html
            dropdown.addEventListener("change", function() {
                var selectedRegion = dropdown.value;

                // Reindirizza l'utente a domande.html con il parametro regione
                window.location.href = `domandeBandiere.html?regione=${encodeURIComponent(selectedRegion)}`;
            });
        })
        .catch(error => {
            console.error("Errore durante la richiesta FETCH:", error);
        });
});
