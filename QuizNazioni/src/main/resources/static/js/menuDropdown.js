document.addEventListener("DOMContentLoaded", function() {
    var dropdownBandiere = document.getElementById("bandiereDropdown");
    var dropdownRegioni = document.getElementById("regioniDropdown");

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
                var option1 = document.createElement("option");
                option1.text = regione;
                option1.value = regione;
                dropdownRegioni.appendChild(option1);
            
                var option2 = document.createElement("option");
                option2.text = regione;
                option2.value = regione;
                dropdownBandiere.appendChild(option2);
            });

            // Aggiungi un evento di click al menu a tendina per reindirizzare a domande.html
            dropdownRegioni.addEventListener("change", function() {
                var selectedRegion = dropdownRegioni.value;

                // Reindirizza l'utente a domande.html con il parametro regione
                window.location.href = `domande.html?regione=${encodeURIComponent(selectedRegion)}&tipo=${encodeURIComponent('capitali')}`;
            });

            dropdownBandiere.addEventListener("change", function() {
                var selectedRegion = dropdownBandiere.value;

                // Reindirizza l'utente a domande.html con il parametro regione
                window.location.href = `domande.html?regione=${encodeURIComponent(selectedRegion)}&tipo=${encodeURIComponent('bandiere')}`;
            });
        })
        .catch(error => {
            console.error("Errore durante la richiesta FETCH:", error);
        });
});
