document.addEventListener("DOMContentLoaded", function () {
    const parametri_url = new URLSearchParams(window.location.search);
    const continente = parametri_url.get("continente");
    const tipo = parametri_url.get("tipo");
    let currentQuestionIndex = 0;
    let domande = [];
    let punteggio = 0;

    function mostraDomanda(index) {
        const domandaContainer = document.getElementById("domanda-container");

        if (domande.length > 0) {
            const domanda = domande[index];
            console.log(domanda);

            if (tipo === "bandNaz") {
                domandaContainer.innerHTML = `
                    <h3>Punteggio: ${punteggio}/10</h3>
                    <h2>${index + 1} | ${domanda.nomeNazione}</h2>
                    <ul id="risposte-list">
                        ${domanda.risposte.map((risposta, i) => `<li><button onclick="checkRisposta(${index}, '${risposta}', this)" style="background-image: url('${risposta}');  width: 150px; height: 100px; background-repeat: no-repeat; object-fit: contain; background-position: center;"></button></li>`).join("")}
                    </ul>
                    <br>
                    <div id="feedback"></div>
                `;
            } else if (tipo === "capNaz") {
                domandaContainer.innerHTML = `
                    <h3>Punteggio: ${punteggio}/10</h3>
                    <h2>${index + 1} | ${domanda.nomeNazione}</h2>
                    <ul id="risposte-list">
                        ${domanda.risposte.map((risposta, i) => `<li><button onclick="checkRisposta(${index}, '${risposta}', this)">${risposta}</button></li>`).join("")}
                    </ul>
                    <br>
                    <div id="feedback"></div>
                `;
            } else if (tipo === "nazBand") {
                const answerImg = document.createElement("img");
                answerImg.src = domanda.nomeNazione;
                domandaContainer.innerHTML = `
                    <h3>Punteggio: ${punteggio}/10</h3>
                    <h2>${index + 1} | </h2>
                    <ul id="risposte-list">
                        ${domanda.risposte.map((risposta, i) => `<li><button onclick="checkRisposta(${index}, '${risposta}', this)">${risposta}</button></li>`).join("")}
                    </ul>
                    <br>
                    <div id="feedback"></div>
                `;
                const h2Element = domandaContainer.querySelector("h2");
                h2Element.appendChild(answerImg);
            }

            if (domanda.rispostaData != undefined) {
                checkRisposta(index, domanda.rispostaData, this);
            }

            document.getElementById("prev-button").disabled = index === 0;
            document.getElementById("next-button").disabled = index === domande.length - 1;
        } else {
            domandaContainer.innerHTML = "<p>Nessuna domanda trovata per la continente specificata.</p>";
        }
    }

    window.checkRisposta = function (index, risposta, button) {
        const feedback = document.getElementById("feedback");
        const correctAnswer = domande[index].corretta;
        const correctImg = document.createElement("img");
        correctImg.src = domande[index].corretta;

        if (risposta === correctAnswer) {
            feedback.textContent = "Corretto!";
            feedback.className = "correct";
            domande[index].check = true;
        } else {
            if (tipo === "nazBand" || tipo === "capNaz") {
                //TODO: messaggio errore bandiere
                feedback.textContent = `Sbagliato! La risposta corretta è: ${correctAnswer}`;
                feedback.className = "incorrect";
            } else if (tipo === "bandNaz") {
                feedback.textContent = `Sbagliato! La risposta corretta è:`;
                feedback.appendChild(correctImg);
                feedback.className = "incorrect";
            }
        }

        if (domande[index].rispostaData === undefined) {
            domande[index].rispostaData = risposta;
            if (domande[index].check) {
                punteggio += 1;
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
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            mostraDomanda(currentQuestionIndex);
        }
    });

    document.getElementById("next-button").addEventListener("click", () => {
        if (currentQuestionIndex < domande.length - 1) {
            currentQuestionIndex++;
            mostraDomanda(currentQuestionIndex);
        }
    });
});
