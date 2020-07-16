import {
  mostrarCartaPokemon,
  mostrarCargandoCard,
  mostrarListaPokemones,
  mostrarCargandoLista,
} from './ui/ui.js';

import {
  obtenerPokemones,
} from './API/service.js';

function mostrarPokemonClickeado() {
  const $pokemones = document.querySelectorAll('td');
  $pokemones.forEach(($pokemon) => {
    $pokemon.addEventListener('click', async () => {
      mostrarCargandoCard();
      const pokemon = await obtenerPokemones(`https://pokeapi.co/api/v2/pokemon/${$pokemon.dataset.pokemon}`);
      if (pokemon !== undefined) {
        mostrarCartaPokemon(pokemon);
      }
    });
  });
}

async function validarSearchBar(searchBarInput) {
  if (/[^A-Za-z0-9]+/g.test(searchBarInput)) {
    alert('Ingrese solo numeros y letras');
  } if (searchBarInput === '') {
    alert('Ingrese un numero o el nombre de un pokemon');
  } else {
    const pokemon = await obtenerPokemones(`https://pokeapi.co/api/v2/pokemon/${searchBarInput}`);
    if (pokemon !== undefined) {
      mostrarCartaPokemon(pokemon);
    }
  }
}

function botonBuscar() {
  const $buscar = document.querySelector('#buscar');
  const $searchBar = document.querySelector('#search-bar');
  $searchBar.addEventListener('keyup', (event) => {
    if (event.keyCode === 13) {
      $buscar.click();
    }
  });
  $buscar.addEventListener('click', async () => {
    const searchBarInput = $searchBar.value;
    validarSearchBar(searchBarInput.toLowerCase());
  });
}

let URLSiguiente;
let URLAnterior;

function actualizarBoton(pokemones) {
  URLSiguiente = pokemones.next;
  URLAnterior = pokemones.previous;
  if (URLAnterior === null) {
    document.querySelector('#botonAnterior').classList.add('disabled');
  } else {
    document.querySelector('#botonAnterior').classList.remove('disabled');
  }
  if (URLSiguiente === null) {
    document.querySelector('#botonSiguiente').classList.add('disabled');
  } else {
    document.querySelector('#botonSiguiente').classList.remove('disabled');
  }
}

async function actualizar(URL) {
  mostrarCargandoLista();
  const pokemones = await obtenerPokemones(URL);
  mostrarListaPokemones(pokemones);
  actualizarBoton(pokemones);
  mostrarPokemonClickeado();
}

function configurarBotones(pokemones) {
  URLSiguiente = pokemones.next;
  URLAnterior = pokemones.previous;
  const $siguiente = document.querySelector('#siguiente');
  const $anterior = document.querySelector('#anterior');

  $anterior.addEventListener('click', () => {
    if (URLAnterior === null) {
      document.querySelector('#botonAnterior').classList.add('disabled');
    } if (URLAnterior === 'https://pokeapi.co/api/v2/pokemon/?offset=956&limit=4') {
      URLAnterior = 'https://pokeapi.co/api/v2/pokemon/?offset=940&limit=20';
      actualizar(URLAnterior);
    } else {
      document.querySelector('#botonAnterior').classList.remove('disabled');
      actualizar(URLAnterior);
    }
  });

  $siguiente.addEventListener('click', () => {
    if (URLSiguiente === null) {
      document.querySelector('#botonSiguiente').classList.add('disabled');
    } else {
      document.querySelector('#botonSiguiente').classList.remove('disabled');
      actualizar(URLSiguiente);
    }
  });
}

async function inicialisar() {
  botonBuscar();
  mostrarCargandoLista();
  const pokemones = await obtenerPokemones();
  mostrarListaPokemones(pokemones);
  configurarBotones(pokemones);
  mostrarPokemonClickeado();
}

inicialisar();
