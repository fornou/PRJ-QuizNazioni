document.addEventListener('DOMContentLoaded', function() {
    const logoutButton = document.getElementById('logoutButton');

    if (logoutButton) {
        logoutButton.addEventListener('click', function(event) {
            event.preventDefault(); // Previeni il comportamento predefinito del link

            // Esegui la richiesta di logout tramite fetch
            fetch('/api/logout', {
                method: 'GET',
                credentials: 'include' // Assicura che le credenziali siano incluse nella richiesta
            })
            .then(response => {
                if (response.redirected) {
                    // Dopo il logout riuscito, reindirizza alla pagina di login
                    window.location.href = response.url;
                } else {
                    console.error('Logout failed:', response.statusText);
                }
            })
            .catch(error => {
                console.error('Error during logout:', error);
            });
        });
    }
});
