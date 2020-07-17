import {
  mostrarListaPokemones,
  mostrarCargandoLista,
// eslint-disable-next-line import/extensions
} from './ui/lista.js';

import {
  mostrarCargandoCard,
  mostrarCartaPokemon,
// eslint-disable-next-line import/extensions
} from './ui/carta.js';

import {
  obtenerPokemones,
  obtenerPokemon,
// eslint-disable-next-line import/extensions
} from './servicios/service.js';

async function validarSearchBar(searchBarInput) {
  if (/[^A-Za-z0-9]+/g.test(searchBarInput)) {
    // eslint-disable-next-line no-alert
    alert('Ingrese solo numeros y letras');
  } if (searchBarInput === '') {
    // eslint-disable-next-line no-alert
    alert('Ingrese un numero o el nombre de un pokemon');
  } else {
    const pokemon = await obtenerPokemon(searchBarInput);
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

async function cambiarPagina(pagina) {
  const POKEMONES_POR_PAGINA = 20;
  let paginaActual;
  let offset;
  const limit = POKEMONES_POR_PAGINA;
  offset = POKEMONES_POR_PAGINA * (pagina - 1);
  paginaActual = pagina;
  mostrarCargandoLista('Cargando...');
  const respuesta = await obtenerPokemones(offset, limit);
  const {
    next: urlSiguiente,
    previous: urlAnterior,
    count: totalPokemones,
  } = respuesta;
  mostrarListaPokemones(respuesta, async (nombre) => {
    mostrarCargandoCard('Cargando...');
    mostrarCartaPokemon(await obtenerPokemon(nombre));
  });

  configurarAnteriorSiguiente(paginaActual, totalPokemones, POKEMONES_POR_PAGINA);
}

function configurarAnteriorSiguiente(paginaActual, totalPokemones, POKEMONES_POR_PAGINA) {
  const $siguiente = document.querySelector('#botonSiguiente');
  const $anterior = document.querySelector('#botonAnterior');
  const totalPaginas = Math.ceil(totalPokemones / POKEMONES_POR_PAGINA);
  $siguiente.onclick = () => {
    if (paginaActual < totalPaginas) {
      $siguiente.classList.remove('disabled');
      // eslint-disable-next-line no-param-reassign
      paginaActual += 1;
      cambiarPagina(paginaActual);
      $anterior.classList.remove('disabled');
    } else {
      $siguiente.classList.add('disabled');
    }
  };
  $anterior.onclick = () => {
    if (paginaActual < 2) {
      $anterior.classList.add('disabled');
      // eslint-disable-next-line no-param-reassign
    } else {
      $anterior.classList.remove('disabled');
      paginaActual -= 1;
      cambiarPagina(paginaActual);
    }
  };
}

async function inicializar() {
  botonBuscar();
  return cambiarPagina(1)
    // eslint-disable-next-line no-console
    .catch((e) => console.error(e));
}

inicializar();
