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
  types: ApiPokemonType[];
  abilities: ApiPokemonAbility[];
  sprites: ApiPokemonSprites;
}

export interface ApiPokemonType {
  slot: number;
  type: ApiNamedResource;
}

export interface ApiPokemonAbility {
  ability: ApiNamedResource;
  'is_hidden': boolean;
  slot: number;
}

export interface ApiPokemonSprites {
  other: {
    'official-artwork': {
      front_default: string;
    },
    dream_world: {
      front_default: string;
    }
  };
}

export interface ApiPokemonSpecies {
  id: number;
  name: string;
  color: ApiNamedResource;
}
