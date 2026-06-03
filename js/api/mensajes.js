let mensajes = [
    { user1Id: "1", user2Id: "2", message: "Hola, ¿cómo estás?" },
    { user1Id: "2", user2Id: "1", message: "¿Qué tal el trabajo?" },
    { user1Id: "1", user2Id: "2", message: "¿Quedamos luego?" },
    { user1Id: "1", user2Id: "2", message: "Te envié el documento." },
    { user1Id: "2", user2Id: "1", message: "Perfecto, lo reviso." },
    { user1Id: "2", user2Id: "1", message: "¿Vienes esta noche?" },
    { user1Id: "1", user2Id: "2", message: "Sí, allí estaré." },
    { user1Id: "1", user2Id: "2", message: "¿Has terminado el proyecto?" },
    { user1Id: "1", user2Id: "2", message: "Casi, me falta un detalle." },
    { user1Id: "2", user2Id: "1", message: "Genial, avísame cuando acabes." }
];


export function getMensajes() {
    document.getElementById("chat").innerHTML = ""

    mensajes.forEach(mensaje => {
        document.getElementById("chat").innerHTML += `
        <p> ${ mensaje.message }</p>
            `

    })
}