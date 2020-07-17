export function mostrarListaPokemones(pokemones, callBackFunction = () => {}) {
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
    $pokemon.onclick = () => callBackFunction(pokemon.name);
    $lista.appendChild($numero);
    $lista.appendChild($pokemon);
    $bodytabla.appendChild($lista);
  });
}

export function mostrarCargandoLista(texto) {
  document.querySelector('#body-tabla').innerHTML = texto;
}
