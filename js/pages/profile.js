import { getUserPosts, editPost, deletePost } from '../api/posts.js';

export async function cargarProfile() {
  const userId = localStorage.getItem('userId');
  const username = localStorage.getItem('username');

  document.getElementById('user-name').textContent = username;

  window.cerrarSesion = function () {
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    navegarA('login');
  };

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
          </div>
          <div class="post-actions-right">
            <button class="action-btn" onclick="abrirModalEditar('${post._id}', \`${post.body}\`)">⋯</button>
          </div>
        </div>
      </div>
    </article>
  `).join('');

  // Modal
  window.abrirModalEditar = function (postId, body) {
    document.getElementById('modal-editar-post').classList.add('abierto');
    document.getElementById('editar-post-input').value = body;
    document.getElementById('editar-post-input').dataset.postId = postId;
  };

  window.cerrarModalEditar = function () {
    document.getElementById('modal-editar-post').classList.remove('abierto');
  };

  window.guardarEdicion = async function () {
    const input = document.getElementById('editar-post-input');
    const postId = input.dataset.postId;
    const body = input.value.trim();
    if (!body) return;

    await editPost(postId, body);
    cerrarModalEditar();
    cargarProfile();
  };

  window.eliminarPostModal = async function () {
    const postId = document.getElementById('editar-post-input').dataset.postId;
    await deletePost(postId);
    cerrarModalEditar();
    cargarProfile();
  };
}