const URL = "/api/nazioni";

fetch(URL)
    .then((risposta) => risposta.json())
    .then((listaNazioni) => {
        const continenti = {};

        const container = document.getElementById("main-content");

        listaNazioni.forEach((nazione) => {
            if (!continenti[nazione.continente]) {
                continenti[nazione.continente] = document.createElement("div"); // Crea il contenitore
                continenti[nazione.continente].classList.add("row", "main", "form-container", "bg-dark", "text-center");

                const titolo = document.createElement("h2"); // Crea il titolo
                titolo.textContent = nazione.continente;
                titolo.classList.add("text-white");
                continenti[nazione.continente].appendChild(titolo);

                const card_group = document.createElement("div"); // Crea il sotto-contenitore per le carte
                card_group.classList.add("card-group", "row");
                continenti[nazione.continente].appendChild(card_group);

                container.appendChild(continenti[nazione.continente]); // Mette il contenitore del continente nella pagina
            }
            // Crea la carta
            const div_col = document.createElement("div");
            div_col.classList.add("col-2");

            const card = document.createElement("div");
            card.classList.add("card", "border");
            card.style.margin = "10px";
            div_col.appendChild(card);

            const card_img = document.createElement("img");
            card_img.style.transform = "scale(0.5)";
            card_img.setAttribute("src", `${nazione.img}`);
            card_img.setAttribute("alt", `${nazione.nome}`);
            card.appendChild(card_img);

            const card_body = document.createElement("div");
            card_body.classList.add("card-body");
            card.appendChild(card_body);

            const card_title = document.createElement("h4");
            card_title.classList.add("card-title");
            card_title.textContent = `${nazione.nome}`;
            card_title.style.fontSize = "18px";
            card_body.appendChild(card_title);

            const card_text = document.createElement("p");
            card_text.classList.add("card-text");
            card_text.textContent = `${nazione.capitale}`;
            card_body.appendChild(card_text);

            continenti[nazione.continente].lastChild.appendChild(div_col);
        });
    });
