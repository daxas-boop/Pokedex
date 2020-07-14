function obtenerPokemones(URL = 'https://pokeapi.co/api/v2/pokemon/') {
  return fetch(URL)
    .then((pokemones) => pokemones.json())
    .then((pokemones) => pokemones);
}

function mostrarListaPokemones(pokemones) {
  const $bodytabla = document.querySelector('#body-tabla');
  $bodytabla.innerHTML = '';
  pokemones.forEach((pokemon, i) => {
    const $lista = document.createElement('tr');
    const $numero = document.createElement('th');
    $numero.setAttribute = ('scope', 'row');
    $numero.innerText = (i + 1); //  cambiar (estatico)
    const $pokemon = document.createElement('td');
    $pokemon.innerText = (pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1));
    $lista.appendChild($numero);
    $lista.appendChild($pokemon);
    $bodytabla.appendChild($lista);
  });
}

async function inicialisar() {
  const pokemones = await obtenerPokemones();
  mostrarListaPokemones(pokemones.results);
}

inicialisar();

// Boton siguiente funciona una sola vez

const $siguiente = document.querySelector('#siguiente');

async function siguiente() {
  const pokemones = await obtenerPokemones();
  const URL = (pokemones.next);
  const newPokemones = await obtenerPokemones(URL);
  mostrarListaPokemones(newPokemones.results);
}

$siguiente.onclick = siguiente;
