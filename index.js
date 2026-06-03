import { getAmigos } from "./js/api/seguidores.js";
import { getMensajes } from "./js/api/mensajes.js";


let userName = "Pedro";

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
    .then((html) => {
      document.getElementById("content").innerHTML = html;
      document.getElementById("user-name").innerText = userName;
      getAmigos().forEach((amigo, index) => {
        document.getElementById("lista-amigos").innerHTML += index % 2 == 0 ?
          `
        <button onclick="getMensajes()" class="friend-info"><strong>${amigo.username}</strong></button>
        `
          :
          `
        <button onclick="getMensajes()" class="friend-info gray-friend"><strong>${amigo.username}</strong></button>
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
