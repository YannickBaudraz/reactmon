import {ApiPokemon, ApiPokemonSpecies, ApiResourceList} from '../types/poke-api';
import axios, {AxiosInstance, AxiosResponse} from 'axios';
import {Pokemon} from '../types/pokemon';

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
      sprites: {
        official: apiPokemon.sprites.other['official-artwork'].front_default,
        svg: apiPokemon.sprites.other.dream_world.front_default
      }
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
}
