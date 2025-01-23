const signForm = document.querySelector("#signin-form");
const signBtn = document.querySelector("#signin-valid");

signBtn.addEventListener("click", async function (e) {
  e.preventDefault();

  const username = document.querySelector("#username").value;
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  const password2 = document.querySelector("#password2").value;

  // Vérification des mots de passe
  if (password !== password2) {
    alert("Les mots de passe ne correspondent pas !");
    return;
  }

  // Vérification des champs vides
  if (!username || !email || !password) {
    alert("Veuillez remplir tous les champs !");
    return;
  }

  const newUser = {
    username,
    email,
    password,
  };

  try {
    // Vérifie si l'email existe déjà
    const existingUsersResponse = await fetch("http://localhost:3000/users");
    const users = await existingUsersResponse.json();

    const emailExists = users.some((user) => user.email === email);
    if (emailExists) {
      alert("Cette adresse email est déjà utilisée !");
      return;
    }

    // Envoie les données du nouvel utilisateur
    const response = await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });

    if (response.ok) {
      alert("Compte créé avec succès !");
      signForm.reset();
    } else {
      alert("Une erreur est survenue lors de la création du compte !");
    }
  } catch (error) {
    console.error(
      "Une erreur est survenue lors de la création du compte !",
      error
    );
    alert("Une erreur est survenue lors de la création du compte !");
  }
});
