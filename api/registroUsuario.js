//
function pruebausers() {
  fetch("https://backendredsocial.vercel.app/usuarios/seeusers")
    .then((res) => res.json())
    .then((data) => {
      data.forEach((usuario) => {
        document.getElementById("users").innerHTML += `
          <p>${usuario.username}</p>
        `;
      });
    });
}

pruebausers();


