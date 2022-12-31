import PokemonDetailsNavBar from '../components/PokemonDetailsNavBar';
import {useQuery} from '@tanstack/react-query';
import {pokemonQuery} from '../queries/pokemon-queries';
import {Params, useParams} from 'react-router-dom';

export default function PokemonDetails() {
  const {id}: Params = useParams();
  const {isLoading, isError, data: pokemon, error} = useQuery(pokemonQuery(Number(id)));

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {(error as Error).message}</div>;
  }

  return (
      <>
        <PokemonDetailsNavBar color={pokemon?.color}/>

        <div className="px-5">
          <div className="flex justify-content-center">
            <img src={pokemon?.sprites.svg} alt={pokemon?.name}/>
          </div>
          <div className="flex justify-content-center">
            <h1>{pokemon?.name}</h1>
          </div>
        </div>
      </>
  );
}
