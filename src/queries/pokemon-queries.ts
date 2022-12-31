import PokeApiService from '../services/poke-api.service';

const pokeApiService = new PokeApiService();

export const pokemonListQuery = {
  queryKey: ['pokemon', 'list'],
  queryFn: () => pokeApiService.getAllPokemon().then((response) => response.data)
};

export const pokemonQuery = (id: number) => ({
  queryKey: ['pokemon', id],
  queryFn: () => pokeApiService.getPokemonById(id).then((response) => response)
});
