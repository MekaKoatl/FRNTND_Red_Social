import { cargarHome } from "./js/pages/home.js";
import { cargarLogin } from "./js/pages/login.js";
import { cargarRegistro } from "./js/pages/registro.js";
import { cargarProfile } from "./js/pages/profile.js";
import { cargarMessages } from "./js/pages/messages.js";
import { buscar } from "./js/pages/buscador.js";

const content = document.getElementById("content");

// window.getMensajes = getMensajes

//variables globales
let userName = "";
let userId = ""
let userSelectedId = ""

// Cargar fragmento HTML
async function cargarFragmento(pagina) {
  const archivo = pagina === "registro" ? "registro" : pagina;
  const res = await fetch(`./app/${archivo}.html`);
  const html = await res.text();
  content.innerHTML = html;
} // ← faltaba esta llave

// Navegación principal
window.navegarA = async function (pagina) {
  // Ocultar navbar en login y registro
  const navbar = document.getElementById("navbar");
  if (pagina === "login" || pagina === "registro") {
    navbar.style.display = "none";
  } else {
    navbar.style.display = "flex";
  }

  document
    .querySelectorAll(".nav-link")
    .forEach((l) => l.classList.remove("active"));
  const linkActivo = document.querySelector(
    `.nav-link[onclick="navegarA('${pagina}')"]`,
  );
  if (linkActivo) linkActivo.classList.add("active");

  await cargarFragmento(pagina);

  switch (pagina) {
    case "home":
      cargarHome();
      break;
    case "login":
      cargarLogin();
      break;
    case "registro":
      cargarRegistro();
      break;
    case "profile":
      cargarProfile();
      break;
    case "messages":
      cargarMessages();
      break;
  }
};


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

// Página inicial — si no hay sesión ir a login, si hay ir a home
// const userId = localStorage.getItem("userId");
// if (!userId) {
//   navegarA("login");
// } else {
//   navegarA("home");
// }

// Abrir/cerrar panel buscador
window.abrirBuscador = function () {
  document.getElementById("panel-buscador").classList.add("abierto");
};

window.cerrarBuscador = function () {
  document.getElementById("panel-buscador").classList.remove("abierto");
};
