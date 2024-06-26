document.addEventListener("DOMContentLoaded", function () {
    let dropdown = document.getElementById("menu-cont");
    let nazioniContainer = document.getElementById("nazioniContainer");
    let nazioniData = []; // Array per memorizzare i dati delle nazioni
    let currentNazioneIndex = 0; // Indice del paese attualmente visualizzato

    const continentURL = "/api/continenti";
    fetch(continentURL)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Errore HTTP ${response.status} - ${response.statusText}`);
            }
            return response.json();
        })
        .then((data) => {
            // console.log("Dati ricevuti:", data); // Output dei dati ricevuti dal backend

            data.forEach((continent) => {
                let option = document.createElement("option");
                option.text = continent;
                option.value = continent;
                dropdown.appendChild(option);
            });

            dropdown.addEventListener("change", function () {
                let selectedContinent = dropdown.value;
                // console.log("Continente selezionato:", selectedContinent); // Output del continente selezionato

                fetchNazioniByContinente(selectedContinent);
            });
        })
        .catch((error) => {
            console.error("Errore durante la richiesta FETCH dei continenti:", error);
        });

    // Funzione per fetchare le nazioni dato un continente
    function fetchNazioniByContinente(continent) {
        const nazioniURL = `/api/nazioni/continente/${continent}`;
        fetch(nazioniURL)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Errore HTTP ${response.status} - ${response.statusText}`);
                }
                return response.json();
            })
            .then((data) => {
                // console.log("Dati delle nazioni:", data); // Output dei dati delle nazioni ricevuti dal backend

                // Memorizza i dati delle nazioni nell'array
                nazioniData = data;

                // Mostra il primo paese
                displayNazione(data[0]);
            })
            .catch((error) => {
                console.error("Errore durante la richiesta FETCH delle nazioni:", error);
            });
    }

    // Funzione per visualizzare una singola nazione
    function displayNazione(nazione) {
        // Pulisci il contenuto precedente
        nazioniContainer.innerHTML = "";

        // Crea una tabella per visualizzare i dati della nazione
        let table = document.createElement("table");
        let headerRow = table.insertRow();
        let headers = ["Nome", "Capitale", "Popolazione", "Bandiera"];

        headers.forEach((headerText) => {
            let header = document.createElement("th");
            header.textContent = headerText;
            headerRow.appendChild(header);
        });

        let row = table.insertRow();
        let cell1 = row.insertCell();
        let cell2 = row.insertCell();
        let cell3 = row.insertCell();
        let cell4 = row.insertCell();

        cell1.textContent = nazione.nome; // Assumi che "nome", "capitale" e "popolazione" siano campi dei dati delle nazioni
        cell2.textContent = nazione.capitale;
        cell3.textContent = nazione.popolazione;

        // Aggiungi l'immagine della bandiera come tag <img>
        let bandieraImg = document.createElement("img");
        bandieraImg.src = nazione.img; // Assumi che "img" sia il campo contenente l'URL dell'immagine della bandiera
        bandieraImg.alt = `Bandiera di ${nazione.nome}`; // Testo alternativo per l'immagine della bandiera
        bandieraImg.style.width = "50px"; // Imposta una larghezza fissa per l'immagine della bandiera
        cell4.appendChild(bandieraImg);

        // Aggiungi la tabella al contenitore delle nazioni
        nazioniContainer.appendChild(table);

        // Aggiungi pulsanti per navigare tra i paesi
        if (nazioniData.length > 1) {
            let prevButton = document.createElement("button");
            prevButton.classList.add("btn");
            prevButton.classList.add("btn-danger");
            prevButton.classList.add("m-2");
            prevButton.textContent = "Precedente";
            prevButton.addEventListener("click", function () {
                if (currentNazioneIndex > 0) {
                    currentNazioneIndex--;
                    displayNazione(nazioniData[currentNazioneIndex]);
                }
            });

            let nextButton = document.createElement("button");
            nextButton.classList.add("btn");
            nextButton.classList.add("btn-primary");
            nextButton.classList.add("m-2");
            nextButton.textContent = "Successivo";
            nextButton.addEventListener("click", function () {
                if (currentNazioneIndex < nazioniData.length - 1) {
                    currentNazioneIndex++;
                    displayNazione(nazioniData[currentNazioneIndex]);
                }
            });

            nazioniContainer.appendChild(prevButton);
            nazioniContainer.appendChild(nextButton);
        }
    }
});
