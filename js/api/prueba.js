//
function pruebausers() {
  fetch(`${BASE_URL}/usuarios/seeusers`)
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


