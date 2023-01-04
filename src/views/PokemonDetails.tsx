import PokemonDetailsNavBar from '../components/Nav/PokemonDetailsNavBar/PokemonDetailsNavBar';
import {useQuery} from '@tanstack/react-query';
import {pokemonQuery} from '../queries/pokemon-queries';
import {Params, useParams} from 'react-router-dom';
import Loader from '../components/Loader';
import React, {useEffect, useRef, useState} from 'react';
import {Messages} from 'primereact/messages';
import {AnimatedSvg} from '../components/Animated/AnimatedSvg';
import {PokemonBasicInfo} from '../components/PokemonBasicInfo/PokemonBasicInfo';
import {PokemonStats} from '../components/PokemonStats';

export default function PokemonDetails() {
  const {id}: Params = useParams();
  const {isLoading, isError, data: pokemon, error} = useQuery(pokemonQuery(Number(id)));
  const messages = useRef<Messages>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    messages.current?.show({
      severity: 'error', sticky: true, detail: (error as Error)?.message
    });

    if (topRef.current) {
      setHeight(topRef.current.getBoundingClientRect().top);
    }
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
      <h1 className="text-center font-semibold mt-8" style={{letterSpacing: '.5rem'}}>
        {pokemon?.name.toUpperCase()}
      </h1>

      <div
          ref={topRef}
          className="grid pb-8"
          style={{height: window.innerHeight - height}}
      >
        <div className="col-4 w-2 m-auto">
          <PokemonBasicInfo pokemon={pokemon}/>
        </div>

        <div className="col-4">
          <div className="flex justify-content-center h-full">
            {pokemon?.sprites?.svg
                ? <AnimatedSvg className="my-auto" svgUrl={pokemon.sprites?.svg} scale={1.5}/>
                : <img src={pokemon?.sprites?.official} alt={`${pokemon?.name} image`}/>
            }
          </div>
        </div>

        <div className="col-4 my-auto px-3">
          <PokemonStats pokemon={pokemon}/>
        </div>
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
