"use StrictMode";
const personajesElemento = document.getElementById('personajes');
const nombreFiltroElemento = document.getElementById('nombreFiltro');
const estadoFiltroElemento = document.getElementById('estadoFiltro');

// tenemos que crear la funcion que haga el llamado a la api

async function obtenerPersonajes (name, status){

    let url = 'https://rickandmortyapi.com/api/character/';
    if (name || status){
        url += '?';
        if(name){
            url += `name=${name}&`;
        }

        if(status){
            url += `status=${status}`;
        }
    }
    const response = await fetch(url);
    const data = await response.json(); 

    return data.results;
}

// la funcion que va a renderizar

async function verPersonajes (name, status) {
    
    // Obtener los personajes filtrados
    const personajesObtenidos = await obtenerPersonajes(name, status);
    
    personajesElemento.innerHTML = '';

    // renderizar los personajes
    for( let personaje of personajesObtenidos ){
        const tarjeta = document.createElement('div');
        tarjeta.classList.add('tarjetaPersonaje');

        tarjeta.innerHTML = `
            <img src="${personaje.image}" />
            <h2> ${personaje.name} </h2>
            <p> Status: ${personaje.status} </p>
            <p> Especie: ${personaje.species} </p>
        `;
        personajesElemento.appendChild(tarjeta);
    }

}

verPersonajes();

personajesElemento.addEventListener('input', () => {
verPersonajes(personajesElemento.value,estadoFiltroElemento.value);
});

estadoFiltroElemento.addEventListener('change', () => {
verPersonajes(personajesElemento.value,estadoFiltroElemento.value);
});