function changePage(page) {
  fetch(page)
    .then((res) => res.text())
    .then((html) => {
      document.getElementById("content").innerHTML = html;
    });
}


function getBuscador() {
  fetch("./app/buscador.html")
    .then((res) => res.text())
    .then((html) => {
      document.getElementById("buscador-content").innerHTML = html;
    });
}