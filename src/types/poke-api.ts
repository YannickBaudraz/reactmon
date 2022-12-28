export interface PokeApiResourceResponse<T> {
  count: number;
  next: string;
  previous: string;
  results: T[];
}

export type IPokemonBulkResult = { name: string, url: string }
export type IPokemonBulkResponse = PokeApiResourceResponse<IPokemonBulkResult>;
