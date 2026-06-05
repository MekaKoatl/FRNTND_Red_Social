import { BASE_URL } from './config.js';

// export async function sendMessage(text) {
//   let text = document.getElementById("mensajeInput").value
//   const res = await fetch(`${BASE_URL}/mensajes`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(text)
//   });
//   return res.json();
//}


export async function chat(contactId){
  const userId = localStorage.getItem("userId")
    const res = await fetch(`./app/messages.html`);
    const html = await res.text();
    content.innerHTML = html;
    console.log(contactId, userId)
    if(contactId){document.getElementById("userContact").innerText = contactId
    fetch(`${BASE_URL}/mensajes/${userId}`,)
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
    });
    }}


export async function getMessage(){
  fetch(`${BASE_URL}/mensajes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ nombre: name, apellido: surname, dni: dni }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
document.getElementbyId("mensajesChat").innerHTML = `<div id="mensajeUser"><p>mensaje el user</p></div>

<div id="mensajePropio"><p>mensaje mio</p></div>`
})
}

