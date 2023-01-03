export interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  color: string;
  types: PokemonType[];
  sprites: PokemonSprites;
  abilities: PokemonAbility[];
  forms: PokemonForm[];
}

export interface PokemonType {
  name: string;
}

export interface PokemonSprites {
  official: string;
  svg: string;
}

export interface PokemonAbility {
  name: string;
}

export interface PokemonForm {
  id: number;
  name: string;
}
