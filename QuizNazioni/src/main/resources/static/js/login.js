document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const params = new URLSearchParams();
        for (const [key, value] of formData) {
            params.append(key, value);
        }

        fetch('/api/signin', {
            method: 'POST',
            body: params
        })
        .then(response => {
            if (response.ok) {
                window.location.href = '/index.html';  // Percorso corretto per la root
            } else {
                return response.text().then(text => { throw new Error(text) });
            }
        })
        .catch(error => {
            alert('Login failed: ' + error.message);
        });
    });
});
