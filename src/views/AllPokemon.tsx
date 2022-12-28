import PokemonList from '../components/PokemonList';
import {IPokemonBulkResult} from '../types/poke-api';

interface AllPokemonProps {
  pokemons: IPokemonBulkResult[];
}

export default function AllPokemon({pokemons}: AllPokemonProps) {
  return (
    <PokemonList pokemons={pokemons} />
  );
}
