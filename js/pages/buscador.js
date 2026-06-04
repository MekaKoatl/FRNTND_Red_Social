//import { getusers } from '../api/usuarios.js';

import { BASE_URL } from './config.js';

//`${BASE_URL}/api/usuarios/seeusers`

function buscar() {
  let searchValue = document.getElementById("buscarInput").value;
  console.log(searchValue);
  fetch(`${BASE_URL}/api/usuarios/seeusers`)
    .then(function (response) {
      return res.json(getusers);
    })
    .then(function (data) {
      document.getElementById("usuariosBuscados").innerHTML = "";
      for (let i = 0; i < data.length; i++) {
        if (
          data[i].usuario.username //o solo username sin usuario
            .toLowerCase()
            .substring(i - 1, data[i].username.length)//cambiar a searchvalue.lenght? si no funciona con data user
            .includes(searchValue.toLowerCase())
        ) {
          document.getElementById("usuariosBuscados").innerHTML +=
                                                      `<div class="usersearched">
                                                      <p class="username">${data[i].username}</p>
                                                      <button onclick="s">ver perfil</button>
                                                      </div>`;
          document.getElementById("usuariosBuscados").style.display = "flex";
        }
      }
    });
}
