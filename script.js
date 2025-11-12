"use StrictMode";
// Clase 11

// Variables globales
var btnCharacters = document.getElementById("Characters");
var output = document.getElementById("output");
var API_URL = "https://rickandmortyapi.com/api/character"; // Cambiado de 'url' a 'API_URL'

// Función para cargar personajes con paginación
async function cargarPersonajes() {
    const resultado = document.getElementById('output'); // Cambiado de 'resultado' a 'output'
    resultado.innerHTML = '<div class="loading">⏳ Cargando personajes...</div>';

    try {
        const response = await fetch(`${API_URL}`);
        
        if (!response.ok) {
            throw new Error('Error al cargar los personajes');
        }

        const data = await response.json();
        mostrarPersonajes(data.results);

    } catch (error) {
        console.error('Error:', error);
        resultado.innerHTML = `<div class="error">❌ Error: ${error.message}</div>`;
    }
}

// Función para buscar personajes con filtros
async function buscarPersonajes() {
    // Obtener valores de los filtros (con verificación de existencia)
    const nombre = document.getElementById('name');
    const status = document.getElementById('status');
    const species = document.getElementById('species');
    const gender = document.getElementById('gender');

    const resultado = document.getElementById('output');
    // Construir URL con parámetros
    let urlBusqueda = `${API_URL}+ "/?" + nombre.value + status.value +species.value + gender.value`; // Cambiado de 'url' a 'urlBusqueda'

    try {
        const response = await fetch(urlBusqueda);
        
        if (!response.ok) {
            throw new Error('No se encontraron personajes con esos criterios');
        }

        const data = await response.json();
        
        totalPaginas = data.info.pages;
        mostrarPersonajes(data.results);

    } catch (error) {
        console.error('Error:', error);
        resultado.innerHTML = `<div class="error">❌ ${error.message}</div>`;
    }
}

// Función para mostrar personajes en el DOM
function mostrarPersonajes(personajes) {
    const resultado = document.getElementById('output');
    
    let html = '<div class="characters-grid">';
    
    personajes.forEach(personaje => {
        html += `
            <div class="character-card">
                <img src="${personaje.image}" alt="${personaje.name}" class="character-image">
                <div class="character-info">
                    <div class="character-name">${personaje.name}</div>
                    <div class="character-detail">
                        <strong>Estado:</strong> ${personaje.status}
                    </div>
                    <div class="character-detail">
                        <strong>Especie:</strong> ${personaje.species}
                    </div>
                    <div class="character-detail">
                        <strong>Género:</strong> ${personaje.gender}
                    </div>
                    <div class="character-detail">
                        <strong>Origen:</strong> ${personaje.origin.name}
                    </div>
                </div>
            </div>
        `;
    });
    
    html += '</div>';
    resultado.innerHTML = html;
}


// Event listener para el botón
btnCharacters.addEventListener("click", buscarPersonajes);

