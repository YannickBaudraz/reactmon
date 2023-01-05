import axios, {AxiosInstance, RawAxiosRequestHeaders} from 'axios';
import {ApiCardList} from '../types/tcg-api';

export default class TcgApiService {
  private readonly axios: AxiosInstance;

  constructor() {
    this.axios = axios.create({
      baseURL: import.meta.env.VITE_TCG_PROXY_URL
    });
  }

  public async getCardsByPokemonName(pokemonName: string) {
    const wantedResource = `cards?q=name:${pokemonName.toLowerCase()}`;
    const headers: RawAxiosRequestHeaders = {'X-TCG-Resource': wantedResource};

    return this.axios.get<ApiCardList>('', {headers});
  }
}
