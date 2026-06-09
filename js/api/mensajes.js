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
    document.getElementById("userContact").innerText = contactId
    };

        // await fetch (`${BASE_URL}/usuarios/seeusers`).then((res) => res.json())
    // .then((data) => {
    //   for(let i = 0; i < data.length; i++)
    //   {if(contactId = _id){document.getElementById("usernameContact").innerText = data.username}}




export async function sendMessage(){
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


export async function getMessages() {
  document.getElementById("mensajesRecibidos").innerText = ""
  const userId1 = document.getElementById("userContact").innerText 
  const userId2 = localStorage.getItem("userId")
  await fetch(`${BASE_URL}/mensajes/conversacion/${userId1}/${userId2}`).then((res) => res.json())
    .then((data) =>
{ console.log(data)
  for(let i = 0; i < data.length; i++)
    if(receiverd == localStorage.getItem("userId") && senderID == document.getElementById("userContact").innerText )
       document.getElementById("mensajesRecibidos").innerHTML += `<div><p>${data[i].text}</p><p class="fechamensaje">${data[i].createdAt}</p></div>`
      })}