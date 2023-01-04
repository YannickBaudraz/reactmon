import PokemonDetailsNavBar from '../components/Nav/PokemonDetailsNavBar/PokemonDetailsNavBar';
import {useQuery} from '@tanstack/react-query';
import {pokemonQuery} from '../queries/pokemon-queries';
import {Params, useParams} from 'react-router-dom';
import Loader from '../components/Loader';
import React, {useEffect, useRef} from 'react';
import {Messages} from 'primereact/messages';
import {PokemonHero} from '../components/PokemonHero/PokemonHero';

export default function PokemonDetails() {
  const {id}: Params = useParams();
  const {isLoading, isError, data: pokemon, error} = useQuery(pokemonQuery(Number(id)));
  const messages = useRef<Messages>(null);

  useEffect(() => {
    messages.current?.show({
      severity: 'error', sticky: true, detail: (error as Error)?.message
    });
  }, [error, isLoading, isError]);

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

    return (
        <PokemonHero pokemon={pokemon}/>
    );
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
