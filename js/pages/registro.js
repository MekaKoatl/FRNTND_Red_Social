import { register } from '../api/usuarios.js';

export function cargarRegistro() {
  window.registrarse = async function () {
    const email = document.getElementById('email').value.trim();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const errorMsg = document.getElementById('error-msg');

    if (!email || !username || !password) {
      errorMsg.textContent = 'Por favor completa todos los campos.';
      return;
    }

    if (password.length < 8) {
      errorMsg.textContent = 'La contraseña debe tener al menos 8 caracteres.';
      return;
    }

    const data = await register(username, email, password);

    if (data.id) {
      localStorage.setItem('userId', data.id);
      localStorage.setItem('username', username);
      navegarA('home');
    } else {
      errorMsg.textContent = data.message;
    }
  }
}
