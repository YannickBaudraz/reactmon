import TcgApiService from '../services/tcg-api.service';

const tcgApiService = new TcgApiService();

export const cardsByPokemonName = (pokemonName: string) => ({
  queryKey: ['cards', pokemonName],
  queryFn: () => tcgApiService.getCardsByPokemonName(pokemonName).then((response) => response.data.data)
});
