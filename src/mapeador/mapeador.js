import Pokemon from '../clases/Pokemon.js';
import ListaPokemones from '../clases/ListaPokemones.js';

export function mapeadorPokemon(pokemonDeApi) {
  const {
    id,
    name: nombre,
    types: tipos,
    height: altura,
    weight: peso,
    abilities: habilidades,
    sprites: { front_default: foto },
  } = pokemonDeApi;

  return new Pokemon(
    id,
    nombre,
    tipos.map((item) => item.type.name),
    altura,
    peso,
    habilidades.map((item) => item.ability.name),
    foto,
  );
}

export function mapeadorListaPokemones(pokemonesDeApi) {
  const {
    count: totalPokemones,
    next: urlSiguiente,
    previous: urlAnterior,
    results: pokemon,
  } = pokemonesDeApi;

  return new ListaPokemones(
    urlSiguiente,
    urlAnterior,
    totalPokemones,
    pokemon,
    pokemon.map((item) => item.name),
    pokemon.map((item) => item.url),
  );
}
