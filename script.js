// Références DOM
const profileIcon = document.querySelector(".user-logo");
const signLogModal = document.querySelector("#sign-log");
const loginModal = document.querySelector("#login");
const userPanelModal = document.querySelector("#user-panel");

const loginButton = document.querySelector("#login-button");
const signinButton = document.querySelector("#signin-button");
const cancelLoginButton = document.querySelector("#annul");
const disconnectButton = document.querySelector("#disconnect-button");

const invOnly = document.querySelectorAll(".inv-only");
const userOnly = document.querySelectorAll(".user-only");

// Fonction pour sauvegarder l'état de connexion
function saveConnectionState(state, user = null) {
  localStorage.setItem("isConnected", state);
  if (user) {
    localStorage.setItem("connectedUser", JSON.stringify(user));
  } else {
    localStorage.removeItem("connectedUser");
  }
}

// Fonction pour charger l'état de connexion
function loadConnectionState() {
  return {
    isConnected: localStorage.getItem("isConnected") === "true",
    user: JSON.parse(localStorage.getItem("connectedUser")) || null,
  };
}

// Initialiser l'état
let { isConnected, user } = loadConnectionState();

// Fonction pour switcher entre user-only et inv-only
function userInvSwitch() {
  if (isConnected) {
    userOnly.forEach((el) => el.classList.remove("hidden"));
    invOnly.forEach((el) => el.classList.add("hidden"));
  } else {
    userOnly.forEach((el) => el.classList.add("hidden"));
    invOnly.forEach((el) => el.classList.remove("hidden"));
  }
}

// Fonction pour masquer toutes les modales
function hideAllModals() {
  signLogModal.style.display = "none";
  loginModal.style.display = "none";
  userPanelModal.style.display = "none";
}

// Initialiser l'affichage lors du chargement de la page
document.addEventListener("DOMContentLoaded", () => {
  const { isConnected: initialConnectionState } = loadConnectionState();
  isConnected = initialConnectionState;
  userInvSwitch(); // Appliquer l'état initial
});

// Afficher la bonne modale au clic sur l'icône de profil
profileIcon.addEventListener("click", () => {
  // Si une modal est déjà ouverte, on ferme toutes les modales
  if (
    signLogModal.style.display === "block" ||
    loginModal.style.display === "block" ||
    userPanelModal.style.display === "block"
  ) {
    hideAllModals(); // Fermer toutes les modales
  } else {
    // Sinon, afficher la modale correspondante
    hideAllModals(); // Fermer toutes les modales avant d'en ouvrir une nouvelle
    if (isConnected) {
      userPanelModal.style.display = "block"; // Afficher la modale utilisateur si connecté
    } else {
      signLogModal.style.display = "block"; // Afficher la modale connexion/inscription si non connecté
    }
  }
});

// Actions pour la modale Se connecter / S'inscrire
loginButton.addEventListener("click", () => {
  hideAllModals();
  loginModal.style.display = "block"; // Afficher la modale de connexion
});

signinButton.addEventListener("click", () => {
  window.location.href = "/signin"; // Redirection vers la page d'inscription
});

// Actions pour la modale de connexion
cancelLoginButton.addEventListener("click", () => {
  hideAllModals(); // Fermer la modale
});

// Action pour la déconnexion
disconnectButton.addEventListener("click", () => {
  isConnected = false; // Réinitialiser le statut
  saveConnectionState(false); // Sauvegarder l'état
  hideAllModals();
  userInvSwitch(); // Basculer les éléments visibles
  alert("Déconnexion réussie !"); // Message de confirmation
});

// Actions pour la connexion
const loginBtn = document.querySelector("#connect-button");

loginBtn.addEventListener("click", async function (e) {
  e.preventDefault();

  const username = document.querySelector("#username").value;
  const password = document.querySelector("#password").value;

  // Vérification des champs vides
  if (!username || !password) {
    alert("Veuillez remplir tous les champs !");
    return;
  }

  try {
    // Récupération des utilisateurs depuis /users
    const response = await fetch("http://localhost:3000/users");

    if (!response.ok) {
      throw new Error("Erreur réseau. Impossible de récupérer les utilisateurs.");
    }

    const users = await response.json();

    // Vérification des identifiants
    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      alert("Connexion réussie !");
      isConnected = true;
      saveConnectionState(true, user); // Enregistrer l'utilisateur connecté
      userInvSwitch(); // Basculer les éléments visibles
      hideAllModals(); // Fermer toutes les modales
    } else {
      alert("Nom d'utilisateur ou mot de passe incorrect !");
    }
  } catch (error) {
    console.error("Une erreur est survenue lors de la connexion :", error);
    alert("Une erreur est survenue lors de la connexion !");
  }
});
