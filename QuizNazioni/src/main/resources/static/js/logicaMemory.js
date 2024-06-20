const URL = "/api/nazioni/memory";

document.addEventListener("DOMContentLoaded", () => {
    fetch(URL)
        .then((response) => response.json())
        .then((data) => {

            const { risposteMescolate } = data;
            const gameBoard = document.querySelector("#game-board");//seleziona tramite id

            // creazione di oggetto carta
            const cards = risposteMescolate.map((imgUrl, index) => ({
                id: index,
                imgUrl,
                flipped: false,
                matched: false,
            }));

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
                }, 1000);

                cardElement.addEventListener("click", () => handleCardClick(cardElement, cards));
            });

        }).catch((error) => {// da errore se non è riuscito a prendere dei dati validi
            console.error("Error fetching images:", error);
        })
});

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let coppie = 0;
let corrette = 0;
let errate = 0;

//const errate = document.createElement("span");
//const coppie = document.createElement("span");
//const corrette = document.createElement("span");
//
//coppie.classList.add("badge bg-primary");
//corrette.classList.add("badge bg-success");
//errate.classList.add("badge bg-danger");

function handleCardClick(cardElement, cards) {
    if (lockBoard) return;// esce se lockboard è true
    const index = cardElement.dataset.index;
    const card = cards[index];

    if (card.flipped || card.matched) return;//se la carta è già matchata o flippata esce -> non permette di modificare una carta già girata

    card.flipped = true;//imposta per quella carta la proprietà flipped a true
    cardElement.querySelector(".front-face").classList.remove("hidden");//mostra il front della carta 
    cardElement.querySelector(".back-face").classList.add("hidden");//toglie il back della carta

    if (!firstCard) {//se la prima carta non è stata assegnata la segna a firstBird ed esce
        firstCard = card;
        return;
    }

    secondCard = card;//assegna la carta alla variabile secondCard
    lockBoard = true;
    const feedback = document.getElementById("feedback");

    if (firstCard.imgUrl === secondCard.imgUrl) {//se le immagini delle due carte sono uguali setto il match a true su entrambe e stampo un feedback
        firstCard.matched = true;
        secondCard.matched = true;
        feedback.textContent = "Continua così!";
        feedback.className = "alert alert-success";
        coppie++;
        setTimeout(() => {// dopo un secondo emmezzo richiama il metodo resetBoard()
            resetBoard();
        }, 2000);

    } else {//se non sono uguali stampa un messaggio di errore
        feedback.textContent = `Sbagliato! La prosssima volta sara più fortunato`;
        feedback.className = "alert alert-danger";
        setTimeout(() => {
            firstCard.flipped = false; // setta flipped su false perchè non è stato indovinato
            secondCard.flipped = false;
            cardElement.querySelector(".front-face").classList.add("hidden");//nasconde il front della faccia
            cardElement.querySelector(".back-face").classList.remove("hidden");//mostra il back
            document.querySelector(`[data-index="${firstCard.id}"] .front-face`).classList.add("hidden");
            document.querySelector(`[data-index="${firstCard.id}"] .back-face`).classList.remove("hidden");
            document.querySelector(`[data-index="${secondCard.id}"] .front-face`).classList.add("hidden");
            document.querySelector(`[data-index="${secondCard.id}"] .back-face`).classList.remove("hidden");
            resetBoard();
        }, 1000);
    }
}

function resetBoard() {// setta a null le due variabili collegate alle carte selezionate
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
    feedback.textContent = null;
    feedback.className = null;

    

    cardElement.classList.add("carta");
    cardElement.dataset.index = index;

    if (coppie == 8) {
        console.log("miaoooo")
        feedback.textContent = "Complimenti!! Hai vinto!!!!!!";
        feedback.className = "alert alert-success";
    }
}

