document.addEventListener("DOMContentLoaded", function () {
    const parametriUrl = new URLSearchParams(window.location.search);
    const continente = parametriUrl.get("continente");
    const tipo = parametriUrl.get("tipo");
    let currentQuestionIndex = 0;
    let domande = [];
    let punteggio = 0;
    let corrette = 0;
    let errate = 0;

    const titolo = document.getElementById("titolo");
    titolo.textContent += continente;

    function mostraDomanda(index) {
        const domandaContainer = document.getElementById("domanda-container");

        let headerDomanda = `
        <div class="row">
            <div class="col">
                <span class="badge bg-primary">${index + 1}/10</span>
            </div>
            <div class="col">
                <span class="badge bg-success">Corrette: ${corrette}</span>
            </div>
            <div class="col">
                <span class="badge bg-danger">Errate: ${errate}</span>
            </div>
        </div>
        `;

        if (domande.length > 0) {
            const domanda = domande[index];
            // console.log(domanda);

            if (tipo === "bandNaz") {
                headerDomanda += `
                    <div class="row">
                        <div class="col">
                            <h3 class="m-4"> ${domanda.nomeNazione}</h3>
                        </div>
                    </div>

                    <div class="row" id="risposte-list">
                        ${domanda.risposte.map((risposta, i) => `<div class="col-6"><button class="btn" onclick="checkRisposta(${index}, '${risposta}', this)" style="background-image: url('${risposta}');  width: 256px; height: 192px; background-repeat: no-repeat; object-fit: contain; background-position: center; transform: scale(0.5);"></button></div>`).join("")}
                    </div> 
                `;
            } else if (tipo === "capNaz") {
                headerDomanda += `
                    <div class="row">
                        <div class="col">
                            <h3 class="m-4"> ${domanda.nomeNazione}</h3>
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

            document.getElementById("prev-button").disabled = index === 0;
            document.getElementById("next-button").disabled = index === domande.length - 1;
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
                punteggio += 1;
                corrette += 1;
            } else {
                errate += 1;
            }
        }

        // Disabilita tutti i pulsanti di risposta dopo la selezione
        document.querySelectorAll("#risposte-list button").forEach((btn) => (btn.disabled = true));
        button.style.fontWeight = "bold";
    };

    if (continente) {
        fetch(`/api/nazioni/${continente}/domande/${tipo}`)
            .then((response) => response.json())
            .then((data) => {
                domande = data.listaDomande || [];
                mostraDomanda(currentQuestionIndex);
            })
            .catch((error) => {
                console.error("Errore durante il recupero delle domande:", error);
                document.getElementById("domanda-container").innerHTML = "<p>Si è verificato un errore durante il recupero delle domande. Riprova più tardi.</p>";
            });
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
        }
    });
});
