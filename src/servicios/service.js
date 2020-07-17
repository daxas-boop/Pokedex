export function obtenerPokemones(offset, limit) {
  return fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`)
    .then((pokemones) => pokemones.json())
    .then((pokemones) => pokemones)
    .catch(() => {
      // eslint-disable-next-line no-alert
      alert('El pokemon no se encontró');
    });
}

export function obtenerPokemon(nombre) {
  return fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`)
    .then((pokemones) => pokemones.json())
    .then((pokemones) => pokemones)
    .catch(() => {
      // eslint-disable-next-line no-alert
      alert('El pokemon no se encontró');
    });
}
