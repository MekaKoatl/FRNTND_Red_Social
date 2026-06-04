export function getMensajes(id) {
  console.log(id);
  document.getElementById("chat").innerHTML = "";

  mensajes.forEach((mensaje) => {
    document.getElementById("chat").innerHTML += `
        <p> ${mensaje.message}</p>
            `;
  });
}
