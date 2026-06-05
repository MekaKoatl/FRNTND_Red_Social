import { getUsers } from '../api/usuarios.js';
import { BASE_URL } from '../api/config.js';
import { getSeguidores, dejar } from '../api/seguidores.js';

export async function buscar() {
  const searchValue = document.getElementById("buscarInput").value.toLowerCase().trim();
  const resultados = document.getElementById("usuariosBuscados");
  const userId = localStorage.getItem('userId');

  if (!searchValue) {
    resultados.innerHTML = '<p>Escribe un nombre para buscar.</p>';
    return;
  }

  // Obtener usuarios y lista de seguidos en paralelo
  const [data, seguidoresData] = await Promise.all([
    getUsers(),
    getSeguidores(userId)
  ]);

  const following = seguidoresData.following || [];

  // Filtrar usuarios que coincidan con la búsqueda y excluir al usuario actual
  const filtrados = data.filter(usuario =>
    usuario.username.toLowerCase().includes(searchValue) &&
    usuario._id.toString() !== userId
  );

  if (filtrados.length === 0) {
    resultados.innerHTML = '<p>No se encontraron usuarios.</p>';
    return;
  }

  resultados.innerHTML = filtrados.map(usuario => {
    const yaSigue = following.some(id => id.toString() === usuario._id.toString());
    return `
      <div class="usuario-resultado">
        <p><strong>@${usuario.username}</strong></p>
        ${yaSigue
          ? `<button onclick="dejarSeguirUsuario('${usuario._id}')">Dejar de seguir</button>`
          : `<button onclick="seguirUsuario('${usuario._id}')">Seguir</button>`
        }
      </div>
    `;
  }).join('');

  window.seguirUsuario = async function(followId) {
    const res = await fetch(`${BASE_URL}/seguidores/seguir`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, followId })
    });
    const data = await res.json();
    alert(data.message);
    buscar();
  }

  window.dejarSeguirUsuario = async function(followId) {
    const data = await dejar(userId, followId);
    alert(data.message);
    buscar();
  }
}