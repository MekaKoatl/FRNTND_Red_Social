import { login } from '../api/usuarios.js';

export function cargarLogin() {
  window.iniciarSesion = async function () {
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const errorMsg = document.getElementById('error-msg');

    // Validaciones locales
    if (!email || !password) {
      errorMsg.textContent = 'Por favor completa todos los campos.';
      return;
    }

    const data = await login(email, password);

    if (data.usuario) {
      localStorage.setItem('userId', data.usuario.id);
      localStorage.setItem('username', data.usuario.username);
      navegarA('home');
    } else {
      errorMsg.textContent = data.message;
    }
  }
}