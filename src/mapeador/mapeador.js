import Pokemon from './clases.js';

export default function mapeador(pokemonDeApi) {
  return new Pokemon(pokemonDeApi);
}
