// Clase 11

var btnCharacters = document.getElementById("Characters");
//var btnUsersAsync = document.getElementById("users-async");
var output = document.getElementById("output");
var url = "https://rickandmortyapi.com/api/character";


function print(usersList) {
  var users = [];
  for (var i = 0; i < usersList.length; i++) {
    var user = usersList[i];
    var userDataFormatted = user.id + " - " + user.name + " (" + user.email + ")";
    users.push(userDataFormatted);
  }
  output.textContent = users.join("\n");
}

function cargarPersonajes() {
  output.textContent = "Cargando...";
  //Filtro para sumarlo a la url

  fetch(url)
    .then(function (response) {
      if (!response.ok) {
        throw new Error("HTTP status " + response.status);
      }
      return response.json();
    })
    .then(function (data) {
      console.log("Users (.then):", data);
      printUsers(data);
    })
    .catch(function (error) {
      console.log(error);
      output.textContent = error;
    });
}

btnCharacters.addEventListener("click", cargarPersonajes);

