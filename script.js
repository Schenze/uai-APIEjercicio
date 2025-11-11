// Clase 11

// Variables globales
var btnCharacters = document.getElementById("Characters");
var output = document.getElementById("output");
var API_URL = "https://rickandmortyapi.com/api/character"; // Cambiado de 'url' a 'API_URL'
var paginaActual = 1; // Variable declarada
var totalPaginas = 1; // Variable declarada

// Función para cargar personajes con paginación
async function cargarPersonajes(pagina = 1) {
    const resultado = document.getElementById('output'); // Cambiado de 'resultado' a 'output'
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

// Función para buscar personajes con filtros
async function buscarPersonajes() {
    // Obtener valores de los filtros (con verificación de existencia)
    const nombre = document.getElementById('name')?.value || '';
    const status = document.getElementById('status')?.value || '';
    const species = document.getElementById('species')?.value || '';
    const gender = document.getElementById('gender')?.value || '';

    const resultado = document.getElementById('output');
    resultado.innerHTML = '<div class="loading">🔍 Buscando personajes...</div>';

    // Construir URL con parámetros
    let urlBusqueda = `${API_URL}?page=1`; // Cambiado de 'url' a 'urlBusqueda'
    if (nombre) urlBusqueda += `&name=${nombre}`;
    if (status) urlBusqueda += `&status=${status}`;
    if (species) urlBusqueda += `&species=${species}`;
    if (gender) urlBusqueda += `&gender=${gender}`;

    try {
        const response = await fetch(urlBusqueda);
        
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

// Función para crear la paginación
function crearPaginacion(info) {
    const paginacion = document.getElementById('pagination');
    
    // Verificar si existe el elemento de paginación
    if (!paginacion) {
        console.warn('No se encontró el elemento con id "pagination"');
        return;
    }
    
    let html = '';

    // Botón anterior
    html += `<button onclick="cargarPersonajes(${paginaActual - 1})" 
             ${!info.prev ? 'disabled' : ''}>⬅️ Anterior</button>`;

    // Número de página actual
    html += `<span>Página ${paginaActual} de ${totalPaginas}</span>`;

    // Botón siguiente
    html += `<button onclick="cargarPersonajes(${paginaActual + 1})" 
             ${!info.next ? 'disabled' : ''}>Siguiente ➡️</button>`;

    paginacion.innerHTML = html;
}

// Event listener para el botón
btnCharacters.addEventListener("click", buscarPersonajes);

