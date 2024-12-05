// Initialiser l'état
let isConnected = false;

// Références DOM
const profileIcon = document.querySelector('.user-logo');
const signLogModal = document.querySelector('#sign-log');
const loginModal = document.querySelector('#login');
const userPanelModal = document.querySelector('#user-panel');

const loginButton = document.querySelector('#login-button');
const signinButton = document.querySelector('#signin-button');
const connectButton = document.querySelector('#connect-button');
const cancelLoginButton = document.querySelector('#annul');
const disconnectButton = document.querySelector('#disconnect-button');

const invOnly = document.querySelectorAll(".inv-only");
const userOnly = document.querySelectorAll(".user-only");

// Fonction pour switcher entre user-only et inv-only
function userInvSwitch() {
    if (isConnected) {
        console.log(document.querySelectorAll('.user-only')); // Vérifiez les nœuds détectés
        console.log(document.querySelectorAll('.inv-only')); // Vérifiez les nœuds détectés
        userOnly.forEach(el => el.classList.remove("hidden"));
        invOnly.forEach(el => el.classList.add("hidden"));
    } else {
        userOnly.forEach(el => el.classList.add("hidden"));
        invOnly.forEach(el => el.classList.remove("hidden"));
    }
}

// Fonction pour masquer toutes les modales
function hideAllModals() {
    signLogModal.style.display = 'none';
    loginModal.style.display = 'none';
    userPanelModal.style.display = 'none';
}

// Initialiser l'affichage lors du chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    userInvSwitch(); // Appliquer l'état initial
});


// Afficher la bonne modale au clic sur l'icône de profil
profileIcon.addEventListener('click', () => {
    // Si une modal est déjà ouverte, on ferme toutes les modales
    if (signLogModal.style.display === 'block' || loginModal.style.display === 'block' || userPanelModal.style.display === 'block') {
        hideAllModals(); // Fermer toutes les modales
    } else {
        // Sinon, afficher la modale correspondante
        hideAllModals(); // Fermer toutes les modales avant d'en ouvrir une nouvelle
        if (isConnected) {
            userPanelModal.style.display = 'block'; // Afficher la modale utilisateur si connecté
        } else {
            signLogModal.style.display = 'block'; // Afficher la modale connexion/inscription si non connecté
        }
    }
});

// Actions pour la modale Se connecter / S'inscrire
loginButton.addEventListener('click', () => {
    hideAllModals();
    loginModal.style.display = 'block'; // Afficher la modale de connexion
});

signinButton.addEventListener('click', () => {
    window.location.href = '/signin'; // Redirection vers la page d'inscription
});

// Actions pour la modale de connexion
connectButton.addEventListener('click', (e) => {
    e.preventDefault();
    isConnected = true; // Changer le statut
    hideAllModals();
    userInvSwitch(); // Basculer les éléments visibles
    alert('Connexion réussie !'); // Message de confirmation
});

cancelLoginButton.addEventListener('click', () => {
    hideAllModals(); // Fermer la modale
});

// Action pour la déconnexion
disconnectButton.addEventListener('click', () => {
    isConnected = false; // Réinitialiser le statut
    hideAllModals();
    userInvSwitch(); // Basculer les éléments visibles
    alert('Déconnexion réussie !'); // Message de confirmation
});
