import { getAmigos } from "./js/api/seguidores.js";
import { getMensajes } from "./js/api/mensajes.js";

//variables globales
let userName = "";
let userId = ""
let userSelectedId = ""

window.getMensajes = getMensajes

window.changePage = (page) => {
  fetch(page)
    .then((res) => res.text())
    .then((html) => {
      document.getElementById("content").innerHTML = html;
    });
}

window.changeProfile = () => {
  fetch("./app/profile.html")
    .then((res) => res.text())
    .then(async (html) => {
      document.getElementById("content").innerHTML = html;
      document.getElementById("user-name").innerText = localStorage.getItem("username")
      const id = localStorage.getItem("userId")
      const amigos = await getAmigos(id)
      console.log(amigos)

      amigos.following.forEach((amigo, index) => {
        document.getElementById("lista-amigos").innerHTML += index % 2 == 0 ?
          `
        <p onclick="getMensajes(${amigo.id})" class="friend-info"><strong>${amigo.username}</strong></p>
        `
          :
          `
        <p onclick="getMensajes(${amigo.id})" class="friend-info gray-friend"><strong>${amigo.username}</strong></p>
        `
      })
    });
}

window.getBuscador = () => {
  fetch("./app/buscador.html")
    .then((res) => res.text())
    .then((html) => {
      document.getElementById("buscador-content").innerHTML = html;
    });
}
