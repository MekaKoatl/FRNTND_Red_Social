let userName = "Pedro";

function changePage(page) {
  fetch(page)
    .then((res) => res.text())
    .then((html) => {
      document.getElementById("content").innerHTML = html;
    });
}

function changeProfile() {
  fetch("./app/profile.html")
    .then((res) => res.text())
    .then((html) => {
      document.getElementById("content").innerHTML = html;
      document.getElementById("user-name").innerText = userName;
    });
}

function getBuscador() {
  fetch("./app/buscador.html")
    .then((res) => res.text())
    .then((html) => {
      document.getElementById("buscador-content").innerHTML = html;
    });
}
