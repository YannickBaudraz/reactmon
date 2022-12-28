import {IPokemonBulkResponse} from '../types/poke-api';
import axios, {AxiosInstance, AxiosResponse} from 'axios';

export default class PokeApiService {
  private readonly axios: AxiosInstance;

  constructor() {
    this.axios = axios.create({
      baseURL: import.meta.env.VITE_POKEAPI_URL
    });
  }

  public async getAllPokemon(): Promise<AxiosResponse<IPokemonBulkResponse>> {
    const lastPokemonToFetch = `905`;

    return this.axios.get<IPokemonBulkResponse>(`/pokemon?limit=${lastPokemonToFetch}`)
  }
}
