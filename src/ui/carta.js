export function mostrarCargandoCard(texto) {
  document.querySelector('#imagen-poke').innerHTML = texto;
}

function mostrarImagenPokemon(pokemon) {
  const $contenedorImagen = document.querySelector('#imagen-poke');
  $contenedorImagen.innerHTML = '';
  const $imagenPokemon = document.createElement('img');
  $imagenPokemon.setAttribute('src', pokemon.foto);
  $imagenPokemon.classList.add('imagen');
  $contenedorImagen.appendChild($imagenPokemon);
}

function mostrarTipoPokemon(pokemon) {
  console.log(pokemon);
  const $contenedorTipo = document.querySelector('#tipo-poke');
  $contenedorTipo.innerHTML = '';
  pokemon.tipos.forEach((tipo) => {
    const $tipo = document.createElement('span');
    $tipo.classList.add('badge', 'badge-pill');
    $tipo.classList.add(tipo);
    $tipo.innerText = (tipo.charAt(0).toUpperCase() + tipo.slice(1));
    $contenedorTipo.appendChild($tipo);
  });
}

function mostrarInfoPokemon(pokemon) {
  const $contenedorInfo = document.querySelector('#info-poke');
  $contenedorInfo.innerHTML = '';
  const $height = document.createElement('h5');
  $height.innerText = (`Height: ${pokemon.altura / 10} m`);
  const $weight = document.createElement('h5');
  $weight.innerText = (`Weight: ${pokemon.peso / 10} Kg.`);
  $contenedorInfo.appendChild($height);
  $contenedorInfo.appendChild($weight);
}

export function mostrarCartaPokemon(pokemon) {
  mostrarTipoPokemon(pokemon);
  mostrarImagenPokemon(pokemon);
  mostrarInfoPokemon(pokemon);
}
