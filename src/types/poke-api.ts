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
  stats: ApiPokemonStats[];
  types: ApiPokemonType[];
  abilities: ApiPokemonAbility[];
  sprites: ApiPokemonSprites;
}

export interface ApiPokemonStats {
  base_stat: number;
  effort: number;
  stat: ApiNamedResource & {
    name: 'hp' | 'attack' | 'defense' | 'special-attack' | 'special-defense' | 'speed';
  };
}

export interface ApiPokemonType {
  slot: number;
  type: ApiNamedResource;
}

export interface ApiPokemonAbility {
  ability: ApiNamedResource;
  is_hidden: boolean;
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
  varieties: ApiPokemonVariety[];
}

export interface ApiPokemonVariety {
  pokemon: ApiNamedResource;
}
