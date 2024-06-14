document.addEventListener("DOMContentLoaded", function() {
    var dropdown = document.getElementById("bandiereDropdown");

    const continentURL = "/api/continenti";
    fetch(continentURL)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Errore HTTP ${response.status} - ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("Dati ricevuti:", data); // Output dei dati ricevuti dal backend

            data.forEach(continent => {
                var option = document.createElement("option");
                option.text = continent;
                option.value = continent;
                dropdown.appendChild(option);
            });

            dropdown.addEventListener("change", function() {
                var selectedContinent = dropdown.value;
                console.log("Continente selezionato:", selectedContinent); // Output del continente selezionato

                fetchNazioniByContinente(selectedContinent);
            });
        })
        .catch(error => {
            console.error("Errore durante la richiesta FETCH dei continenti:", error);
        });
});

function fetchNazioniByContinente(continent) {
    const nazioniURL = `/api/nazioni/regione/${continent}`;
    fetch(nazioniURL)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Errore HTTP ${response.status} - ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("Dati delle nazioni:", data); // Output dei dati delle nazioni ricevuti dal backend

            // Funzione per visualizzare i dati delle nazioni
            displayNazioni(data);
        })
        .catch(error => {
            console.error("Errore durante la richiesta FETCH delle nazioni:", error);
        });
}

function displayNazioni(nazioni) {
    var nazioniContainer = document.getElementById("nazioniContainer");

    // Pulisci il contenuto precedente se necessario
    nazioniContainer.innerHTML = "";

    // Crea una tabella per visualizzare i dati delle nazioni
    var table = document.createElement("table");
    var headerRow = table.insertRow();
    var headers = ["Nome", "Capitale", "Popolazione"];
    
    headers.forEach(headerText => {
        var header = document.createElement("th");
        header.textContent = headerText;
        headerRow.appendChild(header);
    });

    nazioni.forEach(nazione => {
        var row = table.insertRow();
        var cell1 = row.insertCell();
        var cell2 = row.insertCell();
        var cell3 = row.insertCell();
        cell1.textContent = nazione.nome; // Assumi che "nome", "capitale" e "popolazione" siano campi dei dati delle nazioni
        cell2.textContent = nazione.capitale;
        cell3.textContent = nazione.popolazione;
    });

    // Aggiungi la tabella al contenitore delle nazioni
    nazioniContainer.appendChild(table);
}
