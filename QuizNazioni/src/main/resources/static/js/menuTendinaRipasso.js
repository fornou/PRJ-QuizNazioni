document.addEventListener("DOMContentLoaded", function () {
    // Recupera riferimenti agli elementi HTML con i nuovi ID
    var sceltaModalita = document.getElementById("modalita-quiz-quiz");
    var sceltaContinente = document.getElementById("menu-continente-quiz");

    const continentURL = "/api/continenti";

    // Effettua una chiamata FETCH per ottenere i dati dei continenti dal backend
    fetch(continentURL)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Errore HTTP ${response.status} - ${response.statusText}`);
            }
            return response.json();
        })
        .then((data) => {
            // Popola il menu a tendina dell'elemento con l'id menu-continente-quiz con i nomi dei continenti
            data.forEach((continente) => {
                var option = document.createElement("option");
                option.text = continente;
                option.value = continente;
                sceltaContinente.appendChild(option);
            });

            // Aggiungi un evento di change al menu a tendina per reindirizzare o eseguire altre operazioni
            sceltaContinente.addEventListener("change", function () {
                redirectToQuestions();
            });

            // Aggiungi un evento di change anche per la menu a tendina della modalità quiz
            sceltaModalita.addEventListener("change", function () {
                redirectToQuestions();
            });

            // Funzione per reindirizzare alla pagina con i parametri selezionati
            function redirectToQuestions() {
                var selectedCont = sceltaContinente.value;
                var selectedMod = sceltaModalita.value;

                if (selectedCont && selectedMod) {
                    // Reindirizza alla pagina usando l'endpoint REST
                    var endpointURL = `ripasso/domande?continente=${encodeURIComponent(selectedCont)}&modalita=${encodeURIComponent(selectedMod)}`;
                    window.location.href = endpointURL;
                }
            }
        })
        .catch((error) => {
            console.error("Errore durante la richiesta FETCH:", error);
        });
});
