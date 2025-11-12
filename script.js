"use StrictMode";
const personajesElemento = document.getElementById('personajes');
const nombreFiltroElemento = document.getElementById('nombreFiltro');
const estadoFiltroElemento = document.getElementById('estadoFiltro');
const especieFiltroElemento = document.getElementById("especieFiltro");
const generoFiltroElemento = document.getElementById("generoFiltro");
const tipoFiltroElemento = document.getElementById("tipoFiltro");

// tenemos que crear la funcion que haga el llamado a la api

async function obtenerPersonajes (name, status,species,gender,type){
    let url = 'https://rickandmortyapi.com/api/character/';
    if (name || status || species || gender || type){
        url += '?';
        if(name){
            url += `name=${name}&`;
        }
        if(status){
            url += `status=${status}`;
        }
        if(species){
            url += `species=${species}&`;
        }
        if(gender){
            url += `gender=${gender}&`;
        }else
        if(type){
            url += `type=${type}&`;
        }
    }
    const response = await fetch(url);
    const data = await response.json(); 
    return data.results;
}

// la funcion que va a renderizar

async function verPersonajes (name, status, species, gender, type) {
    
    // Obtener los personajes filtrados
    try{
    const personajesObtenidos = await obtenerPersonajes(name, status,species,gender,type);
    
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
            <p> Tipo de especie: ${personaje.type} </p>
            <p> Genero: ${personaje.gender} </p>
        `;
        personajesElemento.appendChild(tarjeta);
    }
    }catch(error){
            personajesElemento.innerHTML = `
            <div class="errorMensaje">
                <p style= "color: white;">Error no hay personajes encontrados</p>
            </div>
        `;
    }
}

verPersonajes();

nombreFiltroElemento.addEventListener('input', () => {
verPersonajes(nombreFiltroElemento.value,estadoFiltroElemento.value,especieFiltroElemento.value,generoFiltroElemento.value,tipoFiltroElemento.value);
});

estadoFiltroElemento.addEventListener('change', () => {
verPersonajes(nombreFiltroElemento.value,estadoFiltroElemento.value,especieFiltroElemento.value,generoFiltroElemento.value,tipoFiltroElemento.value);
});

especieFiltroElemento.addEventListener('change', () => {
verPersonajes(nombreFiltroElemento.value,estadoFiltroElemento.value,especieFiltroElemento.value,generoFiltroElemento.value,tipoFiltroElemento.value);
});

generoFiltroElemento.addEventListener('change', () => {
verPersonajes(nombreFiltroElemento.value,estadoFiltroElemento.value,especieFiltroElemento.value,generoFiltroElemento.value,tipoFiltroElemento.value);
});

tipoFiltroElemento.addEventListener('change', () => {
verPersonajes(nombreFiltroElemento.value,estadoFiltroElemento.value,especieFiltroElemento.value,generoFiltroElemento.value,tipoFiltroElemento.value);
});