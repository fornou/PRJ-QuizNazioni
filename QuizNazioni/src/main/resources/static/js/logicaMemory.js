const URL = "/api/nazioni/memory";

document.addEventListener("DOMContentLoaded", () => {
    fetch(URL)
        .then((response) => response.json())
        .then((data) => {
            const { risposteMescolate } = data;

            // Creazione di oggetto carta
            const cards = risposteMescolate.map((imgUrl, index) => ({
                id: index,
                imgUrl,
                flipped: false,
                matched: false,
            }));

            // Aggiungi un bottone per iniziare il gioco
            const startButton = document.getElementById("btn-gioca");
            startButton.addEventListener("click", () => {
                const opzione = document.getElementById("difficolta");
                const selectedTime = parseInt(opzione.value);
                startGame(selectedTime, cards);
            });
        })
        .catch((error) => {
            console.error("Errore nel recupero delle immagini:", error);
        });
});

function startGame(time, cards) {
    const gameBoard = document.querySelector("#game-board");
    gameBoard.innerHTML = ""; // Pulisce il game board

    // Crea carte e visualizza per n sec quelle di faccia e dopo girale
    cards.forEach((card, index) => {
        const cardElement = document.createElement("div");
        const frontFace = document.createElement("img");
        const backFace = document.createElement("div");

        cardElement.classList.add("carta");
        cardElement.dataset.index = index;

        frontFace.src = card.imgUrl;
        frontFace.classList.add("front-face");
        backFace.classList.add("back-face", "hidden");

        cardElement.appendChild(frontFace);
        cardElement.appendChild(backFace);
        gameBoard.appendChild(cardElement);

        setTimeout(() => {
            backFace.classList.remove("hidden");
            frontFace.classList.add("hidden");
        }, time);

        cardElement.addEventListener("click", () => handleCardClick(cardElement, cards));
    });
}

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let coppie = 0;
let tentativi = 0;
const feedback = document.getElementById("feedback");

function handleCardClick(cardElement, cards) {
    if (lockBoard) return;
    const index = cardElement.dataset.index;
    const card = cards[index];

    if (card.flipped || card.matched) return;

    card.flipped = true;
    cardElement.querySelector(".front-face").classList.remove("hidden");
    cardElement.querySelector(".back-face").classList.add("hidden");

    if (!firstCard) {
        firstCard = card;
        return;
    }

    secondCard = card;
    lockBoard = true;

    if (firstCard.imgUrl === secondCard.imgUrl) {
        coppie++;
        firstCard.matched = true;
        secondCard.matched = true;
        if (coppie < 8) {
            feedback.textContent = "Hai trovato una coppia! Continua così!";
            feedback.className = "alert alert-success";
        }
        setTimeout(() => {
            resetBoard();
        }, 1000);
    } else {
        feedback.textContent = "Hai sbagliato! Ritenta.";
        feedback.className = "alert alert-danger";
        setTimeout(() => {
            firstCard.flipped = false;
            secondCard.flipped = false;
            cardElement.querySelector(".front-face").classList.add("hidden");
            cardElement.querySelector(".back-face").classList.remove("hidden");
            document.querySelector(`[data-index="${firstCard.id}"] .front-face`).classList.add("hidden");
            document.querySelector(`[data-index="${firstCard.id}"] .back-face`).classList.remove("hidden");
            document.querySelector(`[data-index="${secondCard.id}"] .front-face`).classList.add("hidden");
            document.querySelector(`[data-index="${secondCard.id}"] .back-face`).classList.remove("hidden");
            resetBoard();
        }, 1000);
    }
    tentativi++;
    console.log(tentativi);
}

function resetBoard() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
    feedback.textContent = null;
    feedback.className = null;

    if (coppie == 8) {
        console.log("vittoria");
        feedback.textContent = "Complimenti! Hai vinto!";
        feedback.className = "alert alert-success";

        const datiUtente = localStorage.getItem("datiUtente");
        console.log("datiUtente: " + datiUtente);

        if (datiUtente) {
            const dati = JSON.parse(datiUtente);
            console.log("dati: " + dati);

            dati["partite_memory"] += 1;

            if (tentativi < dati["record_memory"]) {
                dati["record_memory"] = tentativi;
            }

            console.log("dati: " + dati);

            const datiStringa = JSON.stringify(dati);
            console.log("datiStringa: " + datiStringa);
            localStorage.setItem("datiUtente", datiStringa);

            fetch("/api/saveStat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json", // Imposta il tipo di contenuto a JSON
                },
                body: datiStringa,
            })
                .then((response) => {
                    if (response.ok) {
                        console.log("Dati salvati nel db");
                    } else {
                        return response.text().then((text) => {
                            throw new Error(text);
                        });
                    }
                })
                .catch((error) => {
                    alert("Errore nel salvataggio dei dati nel db: " + error.message);
                });

            console.log("Dati Salvati");
        } else {
            console.log("Errore nel prendere i dati utente");
        }
    }
}
