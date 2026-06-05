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
    document.getElementById
}


export async function getMessage(){

}