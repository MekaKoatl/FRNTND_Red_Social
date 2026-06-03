import { getSeguidores } from '../api/seguidores.js';
import { getFeed } from '../api/posts.js';

export async function cargarHome() {
  const userId = localStorage.getItem('userId');
  const content = document.getElementById('feed-container');

  // Obtener seguidos
  const { following } = await getSeguidores(userId);

  // Si no sigue a nadie
  if (!following || following.length === 0) {
    content.innerHTML = '<p>No sigues a nadie aún. ¡Busca usuarios para seguir!</p>';
    return;
  }

  // Obtener posts de seguidos
  const posts = await getFeed(following);

  if (posts.length === 0) {
    content.innerHTML = '<p>No hay posts aún.</p>';
    return;
  }

  // Renderizar posts
  content.innerHTML = posts.map(post => `
    <article class="post-card">
      <p class="post-username">${post.username}</p>
      <div class="post-container">
        <div class="post-body">
          <p>${post.body}</p>
        </div>
        <div class="post-actions">
          <div class="post-actions-left">
            <button class="action-btn">&#9825;</button>
            <button class="action-btn">&#128172;</button>
            <button class="action-btn">&#8594;</button>
          </div>
          <div class="post-actions-right">
            <button class="action-btn">&#9651;</button>
          </div>
        </div>
      </div>
    </article>
  `).join('');
}