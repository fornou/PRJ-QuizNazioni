document.addEventListener("DOMContentLoaded", function () {
    const loginButton = document.getElementById("login");
    const registerButton = document.getElementById("register");

    loginButton.addEventListener("click", function (event) {
        event.preventDefault();
        const loginForm = document.getElementById("loginForm");
        const formData = new FormData(loginForm);
        const params = new URLSearchParams();
        for (const [key, value] of formData) {
            params.append(key, value);
        }

        fetch("/api/login", {
            method: "POST",
            body: params,
        })
        .then((response) => {
            if (response.ok) {
                window.location.href = "/index.html"; // Percorso corretto per la root
            } else {
                return response.text().then((text) => {
                    throw new Error(text);
                });
            }
        })
        .catch((error) => {
            alert("Login failed: " + error.message);
        });
    });

    registerButton.addEventListener("click", function (event) {
        event.preventDefault();
        const loginForm = document.getElementById("loginForm");
        const formData = new FormData(loginForm);
        const params = new URLSearchParams();
        for (const [key, value] of formData) {
            params.append(key, value);
        }

        fetch("/api/signin", {
            method: "POST",
            body: params,
        })
        .then((response) => {
            if (response.ok) {
                window.location.href = "/index.html"; // Percorso corretto per la root
            } else {
                return response.text().then((text) => {
                    throw new Error(text);
                });
            }
        })
        .catch((error) => {
            alert("Register failed: " + error.message);
        });
    });
});