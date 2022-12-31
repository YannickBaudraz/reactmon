import PokemonDetailsNavBar from '../components/PokemonDetailsNavBar';
import {useQuery} from '@tanstack/react-query';
import {pokemonQuery} from '../queries/pokemon-queries';
import {Params, useParams} from 'react-router-dom';
import Loader from '../components/Loader';
import {useEffect, useRef} from 'react';
import {Messages} from 'primereact/messages';
import {AnimatedSvg} from '../components/AnimatedSvg';

export default function PokemonDetails() {
  const {id}: Params = useParams();
  const {isLoading, isError, data: pokemon, error} = useQuery(pokemonQuery(Number(id)));
  const messages = useRef<Messages>(null);

  useEffect(() => {
    messages.current?.show({
      severity: 'error', sticky: true, detail: (error as Error)?.message
    });
  }, [error, pokemon, isLoading, isError]);

  const content = (() => {
    if (isLoading) {
      return <Loader/>;
    }

    if (isError) {
      return <div>Error: {(error as Error).message}</div>;
    }

    return <>
      <div className="grid">
        <div className="col-3"></div>

        <div className="col-6">
          <div className="flex justify-content-center">
            <AnimatedSvg svgUrl={pokemon.sprites?.svg}/>
          </div>
          <div className="flex justify-content-center">
            <h1>{pokemon.name.capitalize()}</h1>
          </div>
        </div>

        <div className="col-3"></div>
      </div>
    </>;
  })();

  return (
      <>
        <PokemonDetailsNavBar color={pokemon?.color ?? 'grey'}/>

        <div className="px-5">
          {content}
        </div>
      </>
  );
}
