import {
  cargarPokemon as cargarPokemonDeCache,
  cargarPokemones as cargarPokemonesDeCache,
  guardarPokemon as guardarPokemonCache,
  guardarPokemones as guardarPokemonesCache,
// eslint-disable-next-line import/extensions
} from './cache.js';

import {
  obtenerPokemones,
  obtenerPokemon,
// eslint-disable-next-line import/extensions
} from './api.js';

import mapeador from '../mapeador/mapeador.js';

export async function cargarPokemon(nombre) {
  try {
    return cargarPokemonDeCache(nombre);
  } catch (e) {
    const respuesta = await obtenerPokemon(nombre);
    const pokemon = mapeador(respuesta); // agrego mapeador
    guardarPokemonCache(nombre, pokemon);
    return pokemon;
  }
}

export async function cargarPokemones(offset, limit) {
  try {
    return cargarPokemonesDeCache(offset, limit);
  } catch (e) {
    const pokemones = await obtenerPokemones(offset, limit);
    guardarPokemonesCache(offset, limit, pokemones);
    return pokemones;
  }
}

export function obtenerParametrosDeURL(pagina) {
  let offset;
  let limit;
  try {
    offset = /offset=([0-9]+)/gi.exec(pagina).pop();
    limit = /limit=([0-9]+)/gi.exec(pagina).pop();
  } catch (e) {
    offset = undefined;
    limit = undefined;
  }
  return { offset, limit };
}
