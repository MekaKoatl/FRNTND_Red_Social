

function buscar() {}

function buscar(){
  let searchValue = document.getElementById("buscarInput").value;
  console.log(searchValue);
  fetch("https://backendredsocial.vercel.app//usuarios/seeusers")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      document.getElementById("usuariosBuscados").innerHTML = "";
      for (let i = 0; i < data.length; i++) {
        if (
          data[i].usuario.username //o solo username sin usuario
            .toLowerCase()
            .substring(i - 1, data[i].usuario.username.length)
            .includes(searchValue.toLowerCase())
        ) {
          document.getElementById("usuariosBuscados").innerHTML +=
            `<div class="movie"><h2>${data[i].usuario}</h2>
                                                      <img src=${data[i].image_url}>
                                                      <div class="movfilterinfo">
                                                      <p class="username">${data[i].usuario.username}</p>
                                                      <button onclick="verPerfil()"></button>
                                                      </div>`;
          document.getElementById("mov").style.display = "flex";
        }
      }
    });
}
