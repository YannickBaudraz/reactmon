export interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  color: string;
  sprites: PokemonSprites;
}

export interface PokemonSprites {
  official: string;
  svg: string;
}
