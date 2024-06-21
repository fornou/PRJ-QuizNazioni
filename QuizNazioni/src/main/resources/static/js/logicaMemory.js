const URL = "/api/nazioni/memory";

        document.addEventListener("DOMContentLoaded", () => {
            fetch(URL)
                .then((response) => response.json())
                .then((data) => {
                    const { risposteMescolate } = data;
                    const gameBoard = document.querySelector("#game-board");

                    // Creazione di oggetto carta
                    const cards = risposteMescolate.map((imgUrl, index) => ({
                        id: index,
                        imgUrl,
                        flipped: false,
                        matched: false,
                    }));

                    const selectContainer = document.getElementById("select-container");
                    const selezione = document.createElement("select");
                    selezione.classList.add("class="form-select form-select-lg"")
                    selezione.id = "opzioni";
                    selezione.name = "opzioni";

                    const op1 = document.createElement("option");
                    op1.value = 3000;
                    op1.textContent = "Facile";

                    const op2 = document.createElement("option");
                    op2.value = 1500;
                    op2.textContent = "Intermedio";

                    const op3 = document.createElement("option");
                    op3.value = 500;
                    op3.textContent = "Difficile";

                    selezione.appendChild(op1);
                    selezione.appendChild(op2);
                    selezione.appendChild(op3);

                    selectContainer.appendChild(selezione);

                    // Aggiungi un bottone per iniziare il gioco
                    const startButton = document.createElement("button");
                    startButton.textContent = "Inizia Gioco";
                    startButton.classList.add("btn" ,"btn-primary")
                    startButton.addEventListener("click", () => {
                        const selectedTime = parseInt(selezione.value);
                        startGame(selectedTime, cards);
                    });

                    selectContainer.appendChild(startButton);
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
                    feedback.textContent = "Continua così!";
                    feedback.className = "alert alert-success";
                }
                setTimeout(() => {
                    resetBoard();
                }, 1000);
            } else {
                feedback.textContent = "Sbagliato! La prossima volta sarai più fortunato.";
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
            console.log(tentativi)
        }

        function resetBoard() {
            [firstCard, secondCard] = [null, null];
            lockBoard = false;
            feedback.textContent = null;
            feedback.className = null;

            if (coppie == 8) {
                feedback.textContent = "Complimenti!! Hai vinto!!!!!!";
                feedback.className = "alert alert-success";
            }
        }