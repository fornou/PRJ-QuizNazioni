document.addEventListener("DOMContentLoaded", () => {
    
    const selectContainer = document.getElementById("select-container");

            const selezione = document.createElement("select");
            selezione.id = "opzioni";
            selezione.name = "opzioni";

            const op1 = document.createElement("option");
            op1.value = "option1";
            op1.textContent = "Facile";

            const op2 = document.createElement("option");
            op2.value = "option2";
            op2.textContent = "Intermedio";

            const op3 = document.createElement("option");
            op3.value = "option3";
            op3.textContent = "Difficile";

            selezione.appendChild(op1);
            selezione.appendChild(op2);
            selezione.appendChild(op3);

            selectContainer.appendChild(selezione);
    

});

