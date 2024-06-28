document.addEventListener('DOMContentLoaded', function() {
    // Funzione per verificare se l'utente è loggato
    function checkLoginStatus() {
        fetch('/api/isLoggedIn', {
            method: 'GET',
            credentials: 'include'
        })
        .then(response => {
            if (response.ok) {
                document.getElementById('userIcon').style.display = 'block';
                const loginButtonContainer = document.getElementById('loginButtonContainer');
                if (loginButtonContainer) {
                    loginButtonContainer.style.display = 'none'; // Nasconde il pulsante di login se l'utente è loggato
                }
            } else {
                document.getElementById('userIcon').style.display = 'none';
                const loginButtonContainer = document.getElementById('loginButtonContainer');
                if (loginButtonContainer) {
                    loginButtonContainer.style.display = 'block';
                }
            }
        })
        .catch(error => {
            console.error('Error checking login status:', error);
        });
    }

    // Aggiungi un gestore di eventi per il clic sull'icona utente
    const userIcon = document.getElementById('userIcon');
    if (userIcon) {
        const userIconLink = userIcon.querySelector('a');
        if (userIconLink) {
            userIconLink.addEventListener('click', function(event) {
                event.preventDefault(); // Impedisce il comportamento predefinito del link

                // Reindirizza l'utente alla pagina '/api/user'
                window.location.href = '/api/user';
            });
        }
    }

    // Controlla lo stato di login quando la pagina è caricata
    checkLoginStatus();
});
