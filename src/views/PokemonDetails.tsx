import PokemonDetailsNavBar from '../components/Nav/PokemonDetailsNavBar/PokemonDetailsNavBar';
import {useQuery} from '@tanstack/react-query';
import {pokemonByIdQuery} from '../queries/pokemon-queries';
import {Params, useParams} from 'react-router-dom';
import Loader from '../components/Loader';
import React, {useEffect, useRef} from 'react';
import {Messages} from 'primereact/messages';
import PokemonHero from '../components/sections/PokemonHero/PokemonHero';
import PokemonTCGSection from '../components/sections/PokemonTCGSection/PokemonTCGSection';

export default function PokemonDetails() {
  const {id}: Params = useParams();
  const {isLoading, isError, data: pokemon, error} = useQuery(pokemonByIdQuery(Number(id)));
  const messages = useRef<Messages>(null);

  useEffect(() => {
    messages.current?.show({
      severity: 'error', sticky: true, detail: (error as Error)?.message
    });
  }, [error, isLoading, isError]);

  if (isLoading) return (
      <div className="h-screen flex justify-content-center align-items-center">
        <Loader/>
      </div>
  );

  if (isError) return (
      <div className="grid">
        <Messages ref={messages} className="col-10 col-offset-1"/>
      </div>
  );

  return <>
    <PokemonDetailsNavBar color={pokemon?.color ?? 'black'}/>
    <div className="h-4rem"></div>

    <div className="px-5">
      <PokemonHero pokemon={pokemon}/>
      <PokemonTCGSection pokemon={pokemon}/>
    </div>
  </>;
}
