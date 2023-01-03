import PokemonDetailsNavBar from '../components/PokemonDetailsNavBar/PokemonDetailsNavBar';
import {useQuery} from '@tanstack/react-query';
import {pokemonQuery} from '../queries/pokemon-queries';
import {Params, useParams} from 'react-router-dom';
import Loader from '../components/Loader';
import React, {useEffect, useRef} from 'react';
import {Messages} from 'primereact/messages';
import {AnimatedSvg} from '../components/AnimatedSvg';
import {PokemonBasicInfo} from '../components/PokemonBasicInfo/PokemonBasicInfo';

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
      return (
          <div className="grid">
            <Messages ref={messages} className="col-10 col-offset-1"/>
          </div>
      );
    }

    return <>
      <h1 className="text-center font-semibold" style={{letterSpacing: '.5rem'}}>
        {pokemon?.name.toUpperCase()}
      </h1>

      <div className="grid">
        <div className="col-4 w-2 m-auto">
          <PokemonBasicInfo pokemon={pokemon}/>
        </div>

        <div className="col-4">
          <div className="flex justify-content-center">
            {pokemon?.sprites?.svg
                ? <AnimatedSvg svgUrl={pokemon.sprites?.svg} scale={1.5}/>
                : <img src={pokemon?.sprites?.official} alt={pokemon?.name}/>
            }
          </div>
        </div>

        <div className="col-4"></div>
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
