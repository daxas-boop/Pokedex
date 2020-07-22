function obtenerKeyPokemon(nombre) {
  return `pokemon_${nombre}`;
}

function obtenerKeyPokemones(offset, limit) {
  return `pokemones_${offset}_${limit}`;
}

export function cargarPokemon(nombre) {
  const pokemon = JSON.parse(localStorage.getItem((obtenerKeyPokemon(nombre))));
  if (pokemon === null) {
    throw new Error(`El pokemon con nombre ${nombre} no encontrado`);
  }
  return pokemon;
}

export function cargarPokemones(offset, limit) {
  const pokemones = JSON.parse(localStorage.getItem((obtenerKeyPokemones(offset, limit))));
  if (pokemones === null) {
    throw new Error(`Los pokemones con offset ${offset} y limite ${limit} no encontrado`);
  }
  return pokemones;
}

export function guardarPokemon(nombre, pokemon) {
  localStorage.setItem(obtenerKeyPokemon(nombre), JSON.stringify(pokemon));
}

export function guardarPokemones(offset, limit, pokemones) {
  localStorage.setItem(obtenerKeyPokemones(offset, limit), JSON.stringify(pokemones));
}