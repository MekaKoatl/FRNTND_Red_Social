import { getSeguidores, seguir, dejar } from '../api/seguidores.js';
import { getFeed } from '../api/posts.js';
import { BASE_URL } from '../api/config.js';

export async function cargarHome() {
  const userId = localStorage.getItem('userId');
  const content = document.getElementById('feed-container');

  // Obtener seguidos y feed en paralelo
  const { following } = await getSeguidores(userId);

  // Si no sigue a nadie
  if (!following || following.length === 0) {
    content.innerHTML = '<p>No sigues a nadie aún. ¡Busca usuarios para seguir!</p>';
    return;
  }

  const posts = await getFeed(following);

  if (posts.length === 0) {
    content.innerHTML = '<p>No hay posts aún.</p>';
    return;
  }

  // Renderizar posts
  content.innerHTML = posts.map(post => {
    const yaSigue = following.some(id => id.toString() === post.userId.toString());

    return `
      <article class="post-card">
        <div class="post-header">
          <p class="post-username">@${post.username}</p>
          <button class="follow-btn" onclick="${yaSigue ? `dejarSeguirPost('${post.userId}')` : `seguirPost('${post.userId}')`}">
            ${yaSigue ? 'Dejar de seguir' : 'Seguir'}
          </button>
        </div>
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
    `;
  }).join('');

  window.seguirPost = async function(followId) {
    const res = await fetch(`${BASE_URL}/seguidores/seguir`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, followId })
    });
    const data = await res.json();
    alert(data.message);
    cargarHome();
  }

  window.dejarSeguirPost = async function(followId) {
    const data = await dejar(userId, followId);
    alert(data.message);
    cargarHome();
  }
}