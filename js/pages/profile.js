
export function cargarProfile() {
  window.cerrarSesion = function () {
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    navegarA("login");
  };
}
