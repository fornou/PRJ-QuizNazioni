/**
 * 
 */

// navigate.js

document.addEventListener("DOMContentLoaded", function() {
    var navigateButton = document.getElementById("navigateButton");

    navigateButton.addEventListener("click", function() {
        window.location.href = "api/ripasso"; // Chiama l'endpoint che serve la pagina di ripasso
    });
});

