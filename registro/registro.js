// function register(usuario){
//     fetch(`http://localhost:3000/api/usuarios/registro`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({usuario}),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         const username = document.getElementById("user").value
//         const email = document.getElementById("email").value
//         const password = document.getElementById("password").value

//         for(let i = 0; i < data.usuarios.length; i++){
//             if(password.length < 6){document.getElementById("userAlert").style.color = "red" }
//             //if(data.res.status(400)){document.getElementById("userAlert").innerText = data.res.message}
//             if(){}
//         }

//         });
//       }

  fetch("http://localhost:3000/api/usuarios/registro")
    .then((res) => res.json())
    .then((data) => {
      data.data.forEach((getusers) => {
        document.getElementById("users").innerHTML += `
            <p>${data.username}</p>
           `;
      });
    });


