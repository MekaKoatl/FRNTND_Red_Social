//metodo get: fetch de los usuarios que sigue el usuario
import { BASE_URL } from './config.js';

// Obtener lista de usuarios que sigue un usuario
export async function getSeguidores(userId) {
  const res = await fetch(`${BASE_URL}/seguidores/${userId}`);
  return res.json();
}

// Seguir usuario
export async function seguir(userId, followId) {
  const res = await fetch(`${BASE_URL}/seguidores/seguir`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, followId })
  });
  return res.json();
}

// Dejar de seguir
export async function dejar(userId, followId) {
  const res = await fetch(`${BASE_URL}/seguidores/dejar`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, followId })
  });
  return res.json();
}


