//escribirtexto
//botón descartar (no guarda el post)
//botón publicar nétodo post + añadir publicación al perfil del usuario
//Editar post
//Crear Post

import { BASE_URL } from './config.js';

//Crear Post
export async function createPost(userId, username, body) {
  const res = await fetch(`${BASE_URL}/posts/addpost`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, username, body })
  });
  return res.json();
}

// Ver todos los posts
export async function getAllPosts() {
  const res = await fetch(`${BASE_URL}/posts`);
  return res.json();
}

// Ver posts de un usuario
export async function getUserPosts(userId) {
  const res = await fetch(`${BASE_URL}/posts/user/${userId}`);
  return res.json();
}

// Obtener feed de usuarios seguidos
export async function getFeed(userIds) {
  const res = await fetch(`${BASE_URL}/posts/feed`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userIds })
  });
  return res.json();
}

//Editar post
export async function editPost(postId, body) {
  const res = await fetch(`${BASE_URL}/posts/editpost/${postId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ body })
  });
  return res.json();
}

// Borrar post
export async function deletePost(postId) {
  const res = await fetch(`${BASE_URL}/posts/deletepost/${postId}`, {
    method: "DELETE"
  });
  return res.json();
}