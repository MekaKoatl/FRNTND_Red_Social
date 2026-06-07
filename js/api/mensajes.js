import { BASE_URL } from './config.js';

// export async function sendMessage(text) {
//   const text = document.getElementById("mensajeInput").value
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
    })
    };
    }


export async function getMessage(){
  let senderId = localStorage.getItem("userId")
  let receiverId = document.getElementById("userContact").innerText

  const text = document.getElementById("mensajeInput").value

  await fetch(`${BASE_URL}/mensajes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({receiverId, senderId, text}),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
      })
    }


export async function getConvo() {
  let userId1 = localStorage.getItem("userId") 
  let userId2 = document.getElementById("userContact").innerText
  await fetch(`${BASE_URL}/mensajes/conversacion/${userId1}/${userId2}`).then((res) => res.json())
    .then((data) =>
{ console.log(data)
       document.getElementById("mensajesChat").innerText += data
      })}