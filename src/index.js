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

// eslint-disable-next-line import/extensions
import configurarPaginador from './ui/paginador.js';

import {
  cargarPokemon,
  cargarPokemones,
  obtenerParametrosDeURL,
// eslint-disable-next-line import/extensions
} from './servicios/servicios.js';

async function validarSearchBar(searchBarInput) {
  if (/[^A-Za-z0-9]+/g.test(searchBarInput)) {
    // eslint-disable-next-line no-alert
    alert('Ingrese solo numeros y letras');
  } if (searchBarInput === '') {
    // eslint-disable-next-line no-alert
    alert('Ingrese un numero o el nombre de un pokemon');
  } else {
    const pokemon = await cargarPokemon(searchBarInput);
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
  let limit = POKEMONES_POR_PAGINA;

  if (typeof pagina === 'number') {
    offset = POKEMONES_POR_PAGINA * (pagina - 1);
    paginaActual = pagina;
  } else {
    const parametros = obtenerParametrosDeURL(pagina);
    offset = parametros.offset;
    limit = parametros.limit;
    paginaActual = Math.ceil(parametros.offset / parametros.limit) + 1;
  }

  mostrarCargandoLista('Cargando...');

  const respuesta = await cargarPokemones(offset, limit);
  const {
    next: urlSiguiente,
    previous: urlAnterior,
    count: totalPokemones,
  } = respuesta;
  const totalPaginas = Math.ceil(totalPokemones / POKEMONES_POR_PAGINA);

  mostrarListaPokemones(respuesta, async (nombre) => {
    mostrarCargandoCard('Cargando...');
    mostrarCartaPokemon(await cargarPokemon(nombre));
  });

  configurarPaginador(totalPaginas, paginaActual, urlSiguiente, urlAnterior, cambiarPagina);
}

async function inicializar() {
  botonBuscar();
  return cambiarPagina(1)
    // eslint-disable-next-line no-console
    .catch((e) => console.error(e));
}

inicializar();
