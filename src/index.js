function obtenerPokemones(URL = 'https://pokeapi.co/api/v2/pokemon/') {
  return fetch(URL)
    .then((pokemones) => pokemones.json())
    .then((pokemones) => pokemones)
    .catch(() => {
      alert('El pokemon no se encontró');
    });
}

function mostrarCargandoCard() {
  document.querySelector('#imagen-poke').innerHTML = 'Cargando...';
}

function mostrarImagenPokemon(pokemon) {
  const $contenedorImagen = document.querySelector('#imagen-poke');
  $contenedorImagen.innerHTML = '';
  const $imagenPokemon = document.createElement('img');
  $imagenPokemon.setAttribute('src', pokemon.sprites.front_default);
  $imagenPokemon.classList.add('imagen');
  $contenedorImagen.appendChild($imagenPokemon);
}

function mostrarTipoPokemon(pokemon) {
  const $contenedorTipo = document.querySelector('#tipo-poke');
  $contenedorTipo.innerHTML = '';
  const $tipoPokemon = document.createElement('h5');
  $tipoPokemon.classList.add('justify-content-center');
  pokemon.types.forEach((type) => {
    const $tipo = document.createElement('span');
    $tipo.classList.add('badge', 'badge-pill');
    $tipo.classList.add(type.type.name);
    $tipo.innerText = (type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1));
    $contenedorTipo.appendChild($tipo);
  });
}

function mostrarInfoPokemon(pokemon) {
  const $contenedorInfo = document.querySelector('#info-poke');
  $contenedorInfo.innerHTML = '';
  const $height = document.createElement('h5');
  $height.innerText = (`Height: ${pokemon.height / 10} m`);
  const $weight = document.createElement('h5');
  $weight.innerText = (`Weight: ${pokemon.weight / 10} Kg.`);
  $contenedorInfo.appendChild($height);
  $contenedorInfo.appendChild($weight);
}

function mostrarPokemon(pokemon) {
  mostrarTipoPokemon(pokemon);
  mostrarImagenPokemon(pokemon);
  mostrarInfoPokemon(pokemon);
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
    $numero.innerText = (pokemon.url.slice(34, -1));
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
