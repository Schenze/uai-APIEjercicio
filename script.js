// Clase 11

var btnCharacters = document.getElementById("Characters");
//var btnUsersAsync = document.getElementById("users-async");
var output = document.getElementById("output");
var url = "https://rickandmortyapi.com/api/character";


async function cargarPersonajes(pagina = 1) {
    const resultado = document.getElementById('resultado');
    resultado.innerHTML = '<div class="loading">⏳ Cargando personajes...</div>';

    try {
       const response = await fetch(`${API_URL}?page=${pagina}`);
                
        if (!response.ok) {
            throw new Error('Error al cargar los personajes');
        }

        const data = await response.json();
                
        paginaActual = pagina;
        totalPaginas = data.info.pages;

        mostrarPersonajes(data.results);
        crearPaginacion(data.info);

        } catch (error) {
        console.error('Error:', error);
        resultado.innerHTML = `<div class="error">❌ Error: ${error.message}</div>`;
        }
}
   async function buscarPersonajes() {
    const nombre = document.getElementById('name').value;
    const status = document.getElementById('status').value;
    const species = document.getElementById('species').value;
    const gender = document.getElementById('gender').value;

    const resultado = document.getElementById('output');
    resultado.innerHTML = '<div class="loading">🔍 Buscando personajes...</div>';

            // Construir URL con parámetros
    let url = `${API_URL}?page=1`;
    if (nombre) url += `&name=${nombre}`;
    if (status) url += `&status=${status}`;
    if (species) url += `&species=${species}`;
    if (gender) url += `&gender=${gender}`;

    try {
        const response = await fetch(url);
               
        if (!response.ok) {
            throw new Error('No se encontraron personajes con esos criterios');
            }

            const data = await response.json();
                
            totalPaginas = data.info.pages;
            mostrarPersonajes(data.results);
            crearPaginacion(data.info);

        } catch (error) {
            console.error('Error:', error);
            resultado.innerHTML = `<div class="error">❌ ${error.message}</div>`;
    }
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

