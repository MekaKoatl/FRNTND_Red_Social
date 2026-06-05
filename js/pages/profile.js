import { getUserPosts, editPost, deletePost } from '../api/posts.js';
import { getSeguidores, dejar } from '../api/seguidores.js';
import { editUser } from '../api/usuarios.js';
import { BASE_URL } from '../api/config.js';

export async function cargarProfile() {
  const userId = localStorage.getItem("userId");
  const username = localStorage.getItem("username");

  document.getElementById("user-name").textContent = "@" + username;

  // Mostrar descripción
  const desc = localStorage.getItem("description") || "Sin descripción";
  document.getElementById("user-desc").textContent = desc;

  const btnDesc = document.getElementById("btn-editar-desc");
  btnDesc.textContent = desc && desc !== "Sin descripción" ? "editar descripción" : "+ descripción";

  window.editarDesc = function () {
    document.getElementById("desc-edit").style.display = "flex";
    document.getElementById("desc-input").value = localStorage.getItem("description") || "";
    document.getElementById("btn-editar-desc").style.display = "none";
  };

  window.cancelarDesc = function () {
    document.getElementById("desc-edit").style.display = "none";
    document.getElementById("btn-editar-desc").style.display = "block";
  };

  window.guardarDesc = async function () {
    const description = document.getElementById("desc-input").value.trim();
    const data = await editUser(userId, { description });
    if (data.message === "Datos actualizados correctamente") {
      localStorage.setItem("description", description);
      document.getElementById("user-desc").textContent = description || "Sin descripción";
      cancelarDesc();
      btnDesc.textContent = description ? "editar descripción" : "+ descripción";
    }
  };

  window.cerrarSesion = function () {
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    localStorage.removeItem("description");
    navegarA("login");
  };

  window.verAmigos = async function () {
    const postsSection = document.getElementById("user-posts");
    const postsHeader = document.getElementById("posts-header");
    const btnAmigos = document.querySelector("#profile-buttons button");

    if (postsSection.dataset.modo === "amigos") {
      postsSection.dataset.modo = "posts";
      postsHeader.style.display = "flex";
      btnAmigos.textContent = "amigos";
      cargarProfile();
      return;
    }

    postsSection.dataset.modo = "amigos";
    postsHeader.style.display = "none";
    btnAmigos.textContent = "ver posts";

    const { following } = await getSeguidores(userId);

    if (!following || following.length === 0) {
      postsSection.innerHTML = '<p style="padding:16px">No sigues a nadie aún.</p>';
      return;
    }

    const res = await fetch(`${BASE_URL}/usuarios/seeusers`);
    const usuarios = await res.json();

    const seguidos = usuarios.filter((u) =>
      following.some((id) => id.toString() === u._id.toString())
    );

    postsSection.innerHTML = seguidos.map((u) => `
      <div class="amigo-item">
        <p><strong>@${u.username}</strong></p>
        <button class="follow-btn" onclick="chat('${u._id}')">enviar mensaje</button>
        <button class="follow-btn" onclick="dejarAmigo('${u._id}')">Dejar de seguir</button>
      </div>
    `).join("");

    window.dejarAmigo = async function (followId) {
      await dejar(userId, followId);
      verAmigos();
    };
  };

  const content = document.getElementById("user-posts");
  const posts = await getUserPosts(userId);

  if (posts.length === 0) {
    content.innerHTML = "<p>No hay posts aún.</p>";
    return;
  }

  content.innerHTML = posts.map((post) => `
    <article class="post-card">
      <p class="post-username">@${post.username}</p>
      <div class="post-container">
        <div class="post-body">
          <p>${post.body}</p>
        </div>
        <div class="post-actions">
          <div class="post-actions-left">
            <button class="action-btn"></button>
            <button class="action-btn"></button>
          </div>
          <div class="post-actions-right">
            <button class="action-btn" onclick="abrirModalEditar('${post._id}', \`${post.body}\`)">⋯</button>
          </div>
        </div>
      </div>
    </article>
  `).join("");

  window.abrirModalEditar = function (postId, body) {
    document.getElementById("modal-editar-post").classList.add("abierto");
    document.getElementById("editar-post-input").value = body;
    document.getElementById("editar-post-input").dataset.postId = postId;
  };

  window.cerrarModalEditar = function () {
    document.getElementById("modal-editar-post").classList.remove("abierto");
  };

  window.guardarEdicion = async function () {
    const input = document.getElementById("editar-post-input");
    const postId = input.dataset.postId;
    const body = input.value.trim();
    if (!body) return;
    await editPost(postId, body);
    cerrarModalEditar();
    cargarProfile();
  };

  window.eliminarPostModal = async function () {
    const postId = document.getElementById("editar-post-input").dataset.postId;
    await deletePost(postId);
    cerrarModalEditar();
    cargarProfile();
  };
}