const domande = [];
let index = 0;
let corrette = 0;
let errate = 0;

document.getElementById('prev-button').addEventListener('click', prevDomanda);
document.getElementById('next-button').addEventListener('click', nextDomanda);

function caricaDomanda() {
    fetch(`/api/nazioni/domandaCasuale`)
        .then((response) => response.json())
        .then((data) => {
            domande.push(data);
            mostraDomanda(index);
        })
        .catch((error) => {
            document.getElementById("domanda-container").innerHTML = "<p>Si è verificato un errore durante il recupero delle domande. Riprova più tardi.</p>";
        });
}

function mostraDomanda(indice) {
    const data = domande[indice];
    let headerDomanda = `
    <div class="row">
        <div class="col">
            <span class="badge bg-primary">${indice + 1}/10</span>
        </div>
        <div class="col">
            <span class="badge bg-success" id="corrette">Corrette: ${corrette}</span>
        </div>
        <div class="col">
            <span class="badge bg-danger" id="errate">Errate: ${errate}</span>
        </div>
    </div>
`;

    let domandaHTML = headerDomanda;

    if (data.nomeNazione.includes('https://')) {
        // Tipo 1: Data immagine, indovinare nazione
        domandaHTML += `
        <div class="row">
            <div class="col text-center">
                <img src="${data.nomeNazione}" style="transform: scale(0.5);">
            </div>
        </div>
    `;
    } else {
        // Tipo 2 o Tipo 3: Data nazione
        domandaHTML += `
        <div class="row">
            <div class="col text-center">
                <h3 class="m-4">${data.nomeNazione}</h3>
            </div>
        </div>
    `;
    }

    domandaHTML += `<div class="row" id="risposte-list">`;

    let risposte = data.risposte.map((risposta, idx) => {
        let buttonClass = 'btn-primary';
        if (data.rispostaData !== undefined) {
            if (risposta === data.rispostaData) {
                buttonClass = data.check ? 'btn-success' : 'btn-danger';
            }
        }

        if (data.risposte[0].includes('https://')) {
            // Tipo 2: Data nazione, indovinare bandiera
            return `
            <div class="col-6 text-center mb-3">
                <button 
                    class="btn" onclick="verificaRisposta('${risposta}', '${data.corretta}', this)"
                    style="
                        background-image: url('${risposta}'); 
                        width: 256px; height: 192px; background-repeat: no-repeat;
                        object-fit: contain; background-position: center;
                        transform: scale(0.5);"
                        ${data.rispostaData !== undefined ? 'disabled' : ''}
                >
                </button>
            </div>
        `;
        } else {
            // Tipo 1 o Tipo 3: Data immagine/nazione, indovinare nazione/capitale
            return `
            <div class="col-12 mb-3 text-center">
                <button class="btn ${buttonClass}" onclick="verificaRisposta('${risposta}', '${data.corretta}', this)" ${data.rispostaData !== undefined ? 'disabled' : ''}>
                    ${risposta}
                </button>
            </div>
        `;
        }
    }).join("");

    domandaHTML += risposte;
    domandaHTML += `</div>`;

    const domandaContainer = document.getElementById('domanda-container');
    domandaContainer.innerHTML = domandaHTML;

    if (data.rispostaData !== undefined) {
        verificaRisposta(data.rispostaData, data.corretta, null, true);
    }

    // Gestione pulsanti prev/next
    document.getElementById("prev-button").disabled = indice === 0;
}

function verificaRisposta(risposta, corretta, button, fromHistory = false) {
    const feedback = document.getElementById("feedback");
    const data = domande[index];

    if (risposta === corretta) {
        feedback.textContent = "Corretto!";
        feedback.className = "alert alert-success";
        if (button) button.classList.add('btn-success');
    } else {
        if (data.risposte[0].includes('https://')) {
            feedback.innerHTML = `Sbagliato! La risposta corretta era: <img src="${corretta}" alt="Bandiera" class="img-fluid" style="max-width: 64px;">`;
        } else {
            feedback.textContent = `Sbagliato! La risposta corretta era: ${corretta}`;
        }
        feedback.className = "alert alert-danger";
        if (button) button.classList.add('btn-danger');
    }

    if (!fromHistory) {
        data.rispostaData = risposta;
        data.check = (risposta === corretta);

        if (data.check) {
            corrette++;
        } else {
            errate++;
        }

        // Aggiorna il conteggio delle risposte corrette ed errate
        document.getElementById('corrette').innerText = `Corrette: ${corrette}`;
        document.getElementById('errate').innerText = `Errate: ${errate}`;
    }

    // Disabilita tutti i pulsanti per evitare ulteriori clic
    let buttons = document.querySelectorAll('#domanda-container button');
    buttons.forEach(btn => btn.disabled = true);

    
}

function prevDomanda() {
    const feedback = document.getElementById("feedback");
    feedback.className = "";
    feedback.textContent = "";
    if (index > 0) {
        index--;
        mostraDomanda(index);
    }
}

function nextDomanda() {
    const feedback = document.getElementById("feedback");
    feedback.className = "";
    feedback.textContent = "";
    if (index < domande.length - 1) {
        index++;
        mostraDomanda(index);
    } else {
        caricaDomanda();
        index++;
    }
}

// Carica la prima domanda al caricamento della pagina
window.onload = () => {
    caricaDomanda();
};
