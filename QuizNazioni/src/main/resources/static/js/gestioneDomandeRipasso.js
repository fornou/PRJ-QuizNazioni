document.addEventListener("DOMContentLoaded", function () {
    const parametriUrl = new URLSearchParams(window.location.search);
    const continente = parametriUrl.get("continente");
    const tipo = parametriUrl.get("modalita");
    let currentQuestionIndex = 0;
    let domande = [];
    let corrette = 0;
    let errate = 0;
    let totalQuestionsAnswered = parseInt(localStorage.getItem("totalQuestionsAnswered")) || 0;

    const titolo = document.getElementById("titolo");
    titolo.textContent += continente;

    function mostraDomanda(index) {
        const domandaContainer = document.getElementById("domanda-container");

        let headerDomanda = `
        <div class="row">
            <div class="col">
                <span class="badge bg-primary">Domanda ${currentQuestionIndex + 1}</span>
            </div>
            <div class="col">
                <span class="badge bg-success" id="corrette">Corrette: ${corrette}</span>
            </div>
            <div class="col">
                <span class="badge bg-danger" id="errate">Errate: ${errate}</span>
            </div>
        </div>
        `;

        if (domande.length > 0) {
            const domanda = domande[index];

            if (tipo === "bandNaz") {
                headerDomanda += `
                    <div class="row">
                        <div class="col">
                            <h3 class="m-4">${domanda.nomeNazione}</h3>
                        </div>
                    </div>

                    <div class="row" id="risposte-list">
                        ${domanda.risposte.map((risposta, i) => `<div class="col-6"><button class="btn" onclick="checkRisposta(${index}, '${risposta}', this)" style="background-image: url('${risposta}'); width: 256px; height: 192px; background-repeat: no-repeat; object-fit: contain; background-position: center; transform: scale(0.5);"></button></div>`).join("")}
                    </div> 
                `;
            } else if (tipo === "capNaz") {
                headerDomanda += `
                    <div class="row">
                        <div class="col">
                            <h3 class="m-4">${domanda.nomeNazione}</h3>
                        </div>
                    </div>

                    <div class="row" id="risposte-list">
                            ${domanda.risposte.map((risposta, i) => `<div class="col-12 mb-3"><button class="btn btn-primary" onclick="checkRisposta(${index}, '${risposta}', this)">${risposta}</button></div>`).join("")}
                    </div>
                `;
            } else if (tipo === "nazBand") {
                headerDomanda += `
                    <div class="row">
                        <div class="col">
                            <img src="${domanda.nomeNazione}" style="transform: scale(0.5);"/>
                        </div>
                    </div>

                    <div class="row" id="risposte-list">
                            ${domanda.risposte.map((risposta, i) => `<div class="col-12 mb-3"><button class="btn btn-primary" onclick="checkRisposta(${index}, '${risposta}', this)">${risposta}</button></div>`).join("")}
                    </div>
                `;
            }

            domandaContainer.innerHTML = headerDomanda;

            if (domanda.rispostaData != undefined) {
                checkRisposta(index, domanda.rispostaData, this);
            }

            // Abilita sempre i pulsanti di navigazione
            document.getElementById("prev-button").disabled = false;
            document.getElementById("next-button").disabled = false;
        } else {
            domandaContainer.innerHTML = "<p>Nessuna domanda trovata per il continente specificato.</p>";
        }
    }

    window.checkRisposta = function (index, risposta, button) {
        const feedback = document.getElementById("feedback");
        const correctAnswer = domande[index].corretta;

        if (risposta === correctAnswer) {
            feedback.textContent = "Corretto!";
            feedback.className = "alert alert-success";
            domande[index].check = true;
        } else {
            if (tipo === "nazBand" || tipo === "capNaz") {
                feedback.textContent = `Sbagliato! La risposta corretta era: ${correctAnswer}`;
                feedback.className = "alert alert-danger";
            } else if (tipo === "bandNaz") {
                const correctImg = document.createElement("img");
                correctImg.src = domande[index].corretta;
                correctImg.style = "transform: scale(0.3);";

                feedback.textContent = `Sbagliato! La risposta corretta era:`;
                feedback.className = "alert alert-danger";
                feedback.appendChild(correctImg);
            }
        }

        if (domande[index].rispostaData === undefined) {
            domande[index].rispostaData = risposta;
            if (domande[index].check) {
                corrette += 1;
                const divCorrette = document.getElementById("corrette");
                divCorrette.textContent = `Corrette: ${corrette}`;
            } else {
                errate += 1;
                const divErrate = document.getElementById("errate");
                divErrate.textContent = `Errate: ${errate}`;
            }

            totalQuestionsAnswered++; // Incrementa il conteggio delle domande risposte
            document.getElementById("totalQuestionsAnswered").textContent = totalQuestionsAnswered;

            // Controllo per navigare automaticamente alla prossima domanda se si è alla fine
            if (currentQuestionIndex === domande.length - 1) {
                fetchNuoveDomande();
            }
        }

        // Disabilita tutti i pulsanti di risposta dopo la selezione
        document.querySelectorAll("#risposte-list button").forEach((btn) => {
            btn.disabled = true;
            if (btn.textContent == domande[index].rispostaData) {
                if (domande[index].check) {
                    btn.className = "btn btn-success";
                    btn.style.fontWeight = "bold";
                } else {
                    btn.className = "btn btn-danger";
                    btn.style.fontWeight = "bold";
                }
            }
        });

        // Salva il conteggio delle domande risposte in localStorage
        localStorage.setItem("totalQuestionsAnswered", totalQuestionsAnswered.toString());

        // Abilita il pulsante "Successivo" indipendentemente dalla risposta data
        document.getElementById("next-button").disabled = false;
    };

    function fetchNuoveDomande() {
        fetch(`/api/nazioni/${continente}/domande/${tipo}`)
            .then((response) => response.json())
            .then((data) => {
                if (data.listaDomande && data.listaDomande.length > 0) {
                    domande = data.listaDomande;
                    mostraDomanda(currentQuestionIndex);
                } else {
                    console.log("Nessuna nuova domanda disponibile.");
                }
            })
            .catch((error) => {
                console.error("Errore durante il recupero delle domande:", error);
                document.getElementById("domanda-container").innerHTML = "<p>Si è verificato un errore durante il recupero delle domande. Riprova più tardi.</p>";
            });
    }

    if (continente) {
        fetchNuoveDomande();
    } else {
        document.getElementById("domanda-container").innerHTML = '<p>Parametro "continente" non trovato nell\'URL.</p>';
    }

    document.getElementById("prev-button").addEventListener("click", () => {
        const feedback = document.getElementById("feedback");
        feedback.className = "";
        feedback.textContent = "";
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            mostraDomanda(currentQuestionIndex);
        }
    });

    document.getElementById("next-button").addEventListener("click", () => {
        const feedback = document.getElementById("feedback");
        feedback.className = "";
        feedback.textContent = "";
        if (currentQuestionIndex < domande.length - 1) {
            currentQuestionIndex++;
            mostraDomanda(currentQuestionIndex);
        } else {
            fetchNuoveDomande();
        }
    });
});
