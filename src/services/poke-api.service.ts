import {ApiPokemon, ApiPokemonSpecies, ApiPokemonStats, ApiResourceList} from '../types/poke-api';
import axios, {AxiosInstance, AxiosResponse} from 'axios';
import {Pokemon, PokemonStats} from '../types/pokemon';

enum PokeApiEndpoints {
  POKEMON = 'pokemon',
  POKEMON_SPECIES = 'pokemon-species',
}

export default class PokeApiService {
  private readonly axios: AxiosInstance;

  constructor() {
    this.axios = axios.create({
      baseURL: import.meta.env.VITE_POKEAPI_URL
    });
  }

  public async getAllPokemon(): Promise<AxiosResponse<ApiResourceList>> {
    const lastPokemonToFetch = `905`;
    const allPokemonUrl = `/${PokeApiEndpoints.POKEMON}?limit=${lastPokemonToFetch}`;

    return this.axios.get<ApiResourceList>(allPokemonUrl);
  }

  public async getPokemonById(id: number): Promise<Pokemon> {
    const promises = Promise.all([
      this.getApiPokemon(id),
      this.getPokemonSpecies(id)
    ]);

    return promises.then(([apiPokemon, apiPokemonSpecies]) => ({
      id: apiPokemon.id,
      name: apiPokemon.name,
      height: apiPokemon.height,
      weight: apiPokemon.weight,
      color: apiPokemonSpecies.color.name,
      stats: this.getStats(apiPokemon),
      types: this.getTypes(apiPokemon),
      abilities: this.getAbilities(apiPokemon),
      sprites: this.getSprites(apiPokemon),
      forms: this.getForms(apiPokemonSpecies)
    }));
  }

  private getApiPokemon(id: number) {
    const pokemonUrl = `/${PokeApiEndpoints.POKEMON}/${id}`;

    return this.axios.get<ApiPokemon>(pokemonUrl).then(response => response.data);
  }

  private getPokemonSpecies(id: number) {
    const pokemonSpeciesUrl = `/${PokeApiEndpoints.POKEMON_SPECIES}/${id}`;

    return this.axios.get<ApiPokemonSpecies>(pokemonSpeciesUrl).then(response => response.data);
  }

  private getTypes(apiPokemon: ApiPokemon) {
    return [...apiPokemon.types].sort((a, b) => a.slot - b.slot)
                                .map(t => ({name: t.type.name}));
  }

  private getStats(apiPokemon: ApiPokemon): PokemonStats {
    let statsMap: Record<ApiPokemonStats['stat']['name'], keyof PokemonStats> = {
      hp: 'hp',
      attack: 'attack',
      defense: 'defense',
      'special-attack': 'specialAttack',
      'special-defense': 'specialDefense',
      speed: 'speed'
    };

    return apiPokemon.stats.reduce((stats, stat) => {
      stats[statsMap[stat.stat.name]] = stat.base_stat;
      return stats;
    }, {} as PokemonStats);
  }

  private getAbilities(apiPokemon: ApiPokemon) {
    return [...apiPokemon.abilities].sort((a, b) => a.slot - b.slot)
                                    .map(a => ({name: a.ability.name}));
  }

  private getSprites(apiPokemon: ApiPokemon) {
    return {
      official: apiPokemon.sprites.other['official-artwork'].front_default,
      svg: apiPokemon.sprites.other.dream_world.front_default
    };
  }

  private getForms(apiPokemonSpecies: ApiPokemonSpecies) {
    return apiPokemonSpecies.varieties.map(v => ({
      id: Number(v.pokemon.url.split('/').filter(Boolean).pop()),
      name: v.pokemon.name
    }));
  }
}
