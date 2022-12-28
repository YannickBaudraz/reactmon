import {useQuery} from '@tanstack/react-query';
import React, {useEffect, useRef} from 'react';
import {Messages} from 'primereact/messages';
import {ProgressSpinner} from 'primereact/progressspinner';
import PokemonItem from './PokemonItem/PokemonItem';
import {IPokemonBulkResult} from '../types/poke-api';
import {pokemonListQuery} from '../queries/pokemon-queries';

export default function PokemonList() {
  const {isLoading, isError, data, error} = useQuery(pokemonListQuery);

  const messages = useRef<Messages>(null);
  useEffect(() => {
    messages.current?.show({
      severity: 'error', sticky: true, detail: (error as Error)?.message
    });
  }, [error]);

  if (isLoading) {
    return <div className="flex justify-content-center">
      <ProgressSpinner/>
    </div>;
  }

  if (isError) {
    return <div className="grid">
      <Messages ref={messages} className="col-10 col-offset-1"/>
    </div>;
  }

  return (
      <>
        <h1>Pokemons</h1>

        {data && (
            <div className="grid px-2">
              {data.results.map((pokemon: IPokemonBulkResult) =>
                  <PokemonItem
                      pokemon={pokemon}
                      key={pokemon.name}
                  />
              )}
            </div>
        )}
      </>
  );
}
