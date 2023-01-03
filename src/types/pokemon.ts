export interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  color: string;
  sprites: PokemonSprites;
  abilities: PokemonAbility[];
}

export interface PokemonSprites {
  official: string;
  svg: string;
}

export interface PokemonAbility {
  name: string;
}
