//metodo get: fetch de los usuarios que sigue el usuario
let amigos = [
    { email: "juan@gmail.com", username: "juan123", id: "1" },
    { email: "maria@gmail.com", username: "maria_dev", id: "2" },
    { email: "carlos@gmail.com", username: "carlitos", id: "3" },
    { email: "ana@gmail.com", username: "ana_01", id: "4" },
    { email: "pedro@gmail.com", username: "pedrito", id: "5" },
    { email: "lucia@gmail.com", username: "luciag", id: "6" },
    { email: "david@gmail.com", username: "davidpro", id: "7" },
    { email: "sofia@gmail.com", username: "sofia22", id: "8" },
    { email: "alberto@gmail.com", username: "alber_dev", id: "9" },
    { email: "elena@gmail.com", username: "elenita", id: "10" }
];


export function getAmigos(){
    return amigos
}