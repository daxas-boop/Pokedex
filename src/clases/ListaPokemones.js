export default class ListaPokemones {
  constructor(urlSiguiente, urlAnterior, totalPokemones, pokemon, nombre, url) {
    this.urlSiguiente = urlSiguiente;
    this.urlAnterior = urlAnterior;
    this.totalPokemones = totalPokemones;
    this.pokemon = pokemon;
    this.nombre = nombre;
    this.url = url;
  }
}
