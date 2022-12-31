export interface ApiResourceList {
  count: number;
  next: string;
  previous: string;
  results: ApiNamedResource[];
}

export interface ApiNamedResource {
  name: string,
  url: string
}

export interface ApiPokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: ApiPokemonSprites;
}

export interface ApiPokemonSprites {
  other: {
    'official-artwork': {
      front_default: string;
    },
    dream_world: {
      front_default: string;
    }
  }
}

export interface ApiPokemonSpecies {
  id: number;
  name: string;
  color: ApiNamedResource;
}
