export function obtenerPokemones(URL = 'https://pokeapi.co/api/v2/pokemon/') {
  return fetch(URL)
    .then((pokemones) => pokemones.json())
    .then((pokemones) => pokemones)
    .catch(() => {
      alert('El pokemon no se encontró');
    });
}
