import { editUser, deleteUser } from '../api/usuarios.js';

export function cargarAjustes() {
  window.guardarAjustes = async function () {
    const username = document.getElementById('ajuste-username').value.trim();
    const email = document.getElementById('ajuste-email').value.trim();
    const password = document.getElementById('ajuste-password').value;
    const errorMsg = document.getElementById('ajuste-error');
    const userId = localStorage.getItem('userId');

    if (!username && !email && !password) {
      errorMsg.textContent = 'Completa al menos un campo para actualizar.';
      return;
    }

    if (password && password.length < 8) {
      errorMsg.textContent = 'La contraseña debe tener al menos 8 caracteres.';
      return;
    }

    const campos = {};
    if (username) campos.username = username;
    if (email) campos.email = email;
    if (password) campos.password = password;

    const data = await editUser(userId, campos);

    if (data.message === 'Datos actualizados correctamente') {
      if (username) localStorage.setItem('username', username);
      navegarA('profile');
    } else {
      errorMsg.textContent = data.message;
    }
  };

  window.confirmarBorrarCuenta = function () {
    const confirmar = confirm('¿Estás seguro de que quieres borrar tu cuenta? Esta acción es irreversible.');
    if (confirmar) borrarCuenta();
  };

  window.borrarCuenta = async function () {
    const userId = localStorage.getItem('userId');
    await deleteUser(userId);
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    navegarA('login');
  };
}