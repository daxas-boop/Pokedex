function obtenerPokemones(URL = 'https://pokeapi.co/api/v2/pokemon/') {
  return fetch(URL)
    .then((pokemones) => pokemones.json())
    .then((pokemones) => pokemones)
    .catch(() => {
      alert('El pokemon no se encontró');
    });
}

function mostrarCargandoCard() {
  document.querySelector('#columna2').innerHTML = 'Cargando...';
}

function mostrarPokemon(pokemon) {
  const col2 = document.querySelector('#columna2');
  col2.innerHTML = '';
  const $tipoPokemon = document.createElement('h5');
  const tipos = [];
  pokemon.types.forEach((type) => {
    tipos.push(type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1));
  });
  $tipoPokemon.innerText = (`Type: ${tipos.join(' and ')}`);
  const $imagenPokemon = document.createElement('img');
  $imagenPokemon.setAttribute('src', pokemon.sprites.front_default);
  $imagenPokemon.classList.add('imagen');
  const $contenedor = document.createElement('div');
  $contenedor.classList.add('auto');
  $contenedor.appendChild($imagenPokemon);
  $contenedor.appendChild($tipoPokemon);
  col2.appendChild($contenedor);
}

function pokemonClick() {
  const $pokemones = document.querySelectorAll('td');
  $pokemones.forEach(($pokemon) => {
    $pokemon.addEventListener('click', async () => {
      mostrarCargandoCard();
      const pokemon = await obtenerPokemones(`https://pokeapi.co/api/v2/pokemon/${$pokemon.dataset.pokemon}`);
      mostrarPokemon(pokemon);
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
    mostrarPokemon(pokemon);
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


function mostrarListaPokemones(pokemones) {
  const $bodytabla = document.querySelector('#body-tabla');
  $bodytabla.innerHTML = '';
  pokemones.results.forEach((pokemon) => {
    const $lista = document.createElement('tr');
    const $numero = document.createElement('th');
    $numero.setAttribute = ('scope', 'row');
    $numero.innerText = (pokemon.url.slice(34, -1)); //  cambiar (estatico)
    const $pokemon = document.createElement('td');
    $pokemon.dataset.pokemon = pokemon.name;
    $pokemon.innerText = (pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1));
    $lista.appendChild($numero);
    $lista.appendChild($pokemon);
    $bodytabla.appendChild($lista);
  });
  pokemonClick();
}

let URLSiguiente;
let URLAnterior;

function mostrarCargandoLista() {
  document.querySelector('#body-tabla').innerHTML = 'Cargando...';
}

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
}

function botones(pokemones) {
  URLSiguiente = pokemones.next;
  URLAnterior = pokemones.previous;
  const $siguiente = document.querySelector('#siguiente');
  const $anterior = document.querySelector('#anterior');

  $anterior.addEventListener('click', () => {
    if (URLAnterior === null) {
      document.querySelector('#botonAnterior').classList.add('disabled');
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
  botones(pokemones);
}

inicialisar();
