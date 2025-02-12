// const loginBtn = document.querySelector("#connect-button");

// loginBtn.addEventListener("click", async function (e) {
//   e.preventDefault();

//   const username = document.querySelector("#username").value;
//   const password = document.querySelector("#password").value;

//   // Vérification des champs vides
//   if (!username || !password) {
//     alert("Veuillez remplir tous les champs !");
//     return;
//   }

//   try {
//     // Récupération des utilisateurs depuis /users
//     const response = await fetch("http://localhost:3000/users");
//     const users = await response.json();

//     // Vérification des identifiants
//     const user = users.find(
//       (u) => u.username === username && u.password === password
//     );

//     if (user) {
//       alert("Connexion réussie !");
//       localStorage.setItem("connectedUser", JSON.stringify(user)); // Enregistrer l'utilisateur connecté
//     } else {
//       alert("Nom d'utilisateur ou mot de passe incorrect !");
//     }
//   } catch (error) {
//     console.error("Une erreur est survenue lors de la connexion :", error);
//     alert("Une erreur est survenue lors de la connexion !");
//   }
// });