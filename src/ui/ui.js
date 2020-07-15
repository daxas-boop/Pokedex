export function mostrarListaPokemones(pokemones) {
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
}

export function mostrarCargandoCard() {
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

export function mostrarCargandoLista() {
  document.querySelector('#body-tabla').innerHTML = 'Cargando...';
}

export function mostrarCartaPokemon(pokemon) {
  mostrarTipoPokemon(pokemon);
  mostrarImagenPokemon(pokemon);
  mostrarInfoPokemon(pokemon);
}
