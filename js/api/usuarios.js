import { BASE_URL } from './config.js';

// Registrar usuario
export async function register(username, email, password) {
  const res = await fetch(`${BASE_URL}/usuarios/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password })
  });
  return res.json();
}

// Login
export async function login(email, password) {
  const res = await fetch(`${BASE_URL}/usuarios/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });
  return res.json();
}

// Editar usuario
export async function editUser(userid, campos) {
  const res = await fetch(`${BASE_URL}/usuarios/edituser/${userid}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(campos)
  });
  return res.json();
}

// Eliminar usuario
export async function deleteUser(userid) {
  const res = await fetch(`${BASE_URL}/usuarios/deleteuser/${userid}`, {
    method: "DELETE"
  });
  return res.json();
}

// Ver todos los usuarios
export async function getUsers() {
  const res = await fetch(`${BASE_URL}/usuarios/seeusers`);
  return res.json();
}

