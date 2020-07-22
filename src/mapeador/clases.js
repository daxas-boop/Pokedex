export default class Pokemon {
  constructor(pokemon) {
    this.nombre = pokemon.name;
    this.tipos = pokemon.types.map((item) => item.type.name);
    this.altura = pokemon.height;
    this.peso = pokemon.weight;
    this.habilidades = pokemon.abilities.map((item) => item.ability.name);
    this.foto = pokemon.sprites.front_default;
  }
}
