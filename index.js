import { cargarHome } from "./js/pages/home.js";
import { cargarLogin } from "./js/pages/login.js";
import { cargarRegistro } from "./js/pages/registro.js";
import { cargarProfile } from "./js/pages/profile.js";
import { cargarMessages } from "./js/pages/messages.js";
import { buscar } from "./js/pages/buscador.js";

const content = document.getElementById("content");

//variables globales
let userName = "";
let userId = "";
let userSelectedId = "";

// Cargar fragmento HTML
async function cargarFragmento(pagina) {
  const res = await fetch(`./app/${pagina}.html`);
  const html = await res.text();
  content.innerHTML = html;
}

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
    case "home":     cargarHome(); break;
    case "login":    cargarLogin(); break;
    case "registro": cargarRegistro(); break;
    case "profile":  cargarProfile(); break;
    case "messages": cargarMessages(); break;
  }
};

// Página inicial — si no hay sesión ir a login, si hay ir a home
const userId_stored = localStorage.getItem("userId");
if (!userId_stored) {
  navegarA("login");
} else {
  navegarA("home");
}

// Abrir/cerrar panel buscador
window.abrirBuscador = function () {
  document.getElementById("panel-buscador").classList.add("abierto");
};

window.cerrarBuscador = function () {
  document.getElementById("panel-buscador").classList.remove("abierto");
};


// Abrir modal crear post
window.abrirModalPost = function () {
  document.getElementById('modal-post').classList.add('abierto');
}

// Descartar post
window.descartarPost = function () {
  document.getElementById('post-input').value = '';
  document.getElementById('modal-post').classList.remove('abierto');
}

// Publicar post
window.publicarPost = async function () {
  const body = document.getElementById('post-input').value.trim();
  if (!body) return;

  const userId = localStorage.getItem('userId');
  const username = localStorage.getItem('username');

  const res = await fetch('https://backendredsocial.vercel.app/posts/addpost', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, username, body })
  });
  const data = await res.json();

  if (data.id) {
    descartarPost();
    navegarA('profile');
  } else {
    alert('Error al publicar');
  }
}