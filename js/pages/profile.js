import { getUserPosts } from '../api/posts.js';

export async function cargarProfile() {
  const userId = localStorage.getItem('userId');
  const username = localStorage.getItem('username');

  // Mostrar nombre de usuario
  document.getElementById('user-name').textContent = username;

  // Cerrar sesión
  window.cerrarSesion = function () {
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    navegarA('login');
  };

  // Cargar posts del usuario
  const content = document.getElementById('user-posts');
  const posts = await getUserPosts(userId);

  if (posts.length === 0) {
    content.innerHTML = '<p>No hay posts aún.</p>';
    return;
  }

  content.innerHTML = posts.map(post => `
    <article class="post-card">
      <p class="post-username">${post.username}</p>
      <div class="post-container">
        <div class="post-body">
          <p>${post.body}</p>
        </div>
        <div class="post-actions">
          <div class="post-actions-left">
            <button class="action-btn"></button>
            <button class="action-btn"></button>
            <button class="action-btn"></button>
          </div>
          <div class="post-actions-right">
            <button class="action-btn"></button>
          </div>
        </div>
      </div>
    </article>
  `).join('');
}