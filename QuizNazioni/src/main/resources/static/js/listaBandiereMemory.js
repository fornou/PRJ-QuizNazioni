const URL = "/api/nazioni/memory";

document.addEventListener('DOMContentLoaded', () => {
    fetch(URL)
        .then((response) => response.json())
        .then((data) => {
            const { risposteMescolate } = data;
            const gameBoard = document.querySelector("#game-board");

            // creazione di oggetto carta
            const cards = risposteMescolate.map((imgUrl, index) => ({
                id: index,
                imgUrl,
                flipped: false,
                matched: false
            }));

            // mostra carte a faccia in giù
            cards.forEach((card, index) => {
                const cardElement = document.createElement("div");
                cardElement.classList.add("carta");
                cardElement.dataset.index = index;

                const frontFace = document.createElement("img");
                frontFace.src = card.imgUrl;
                frontFace.classList.add("front-face", "hidden");

                const backFace = document.createElement("div");
                backFace.classList.add("back-face");

                cardElement.appendChild(frontFace);
                cardElement.appendChild(backFace);
                gameBoard.appendChild(cardElement);

                cardElement.addEventListener('click', () => handleCardClick(cardElement, cards));
            });
        })
        .catch((error) => {
            console.error('Error fetching images:', error);
        });
});



let firstCard = null;
let secondCard = null;
let lockBoard = false;

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
        firstCard.matched = true;
        secondCard.matched = true;
        resetBoard();
    } else {
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
}

function resetBoard() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}
