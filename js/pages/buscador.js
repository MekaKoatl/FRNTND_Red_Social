//import { getusers } from '../api/usuarios.js';

import { BASE_URL } from "../api/config.js";

//`${BASE_URL}/api/usuarios/seeusers`

// export async function buscar() {
//   const searchValue = document.getElementById("buscarInput").value.toLowerCase();
//   const data = await getUsers();

//   document.getElementById("usuariosBuscados").innerHTML = "";
//   data
//     .filter(u => u.username.toLowerCase().includes(searchValue))
//     .forEach(u => {
//       document.getElementById("usuariosBuscados").innerHTML += `
//         <div class="usersearched">
//           <p>${u.username}</p>
//           <button>ver perfil</button>
//         </div>`;
//     });
// }


export async function buscar() {
 const searchValue = document.getElementById("buscarInput").value.toLowerCase();
  console.log(searchValue);
  const data = await getUsers();
  await fetch(`${BASE_URL}/api/usuarios/seeusers`)
    .then(function (response) {
      return res.json(getusers);
    })
    .then(function (data) {
      document.getElementById("usuariosBuscados").innerHTML = "";
      for (let i = 0; i < data.length; i++) {
        if (
          data[i].usuario.username //o solo username sin usuario
            .toLowerCase()
            .substring(i - 1, data[i].username.length)//cambiar a searchvalue.lenght? 
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



import { getUsers } from "../api/usuarios.js";
