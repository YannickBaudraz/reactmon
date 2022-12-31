import PokemonList from '../components/PokemonList';
import {ApiNamedResource} from '../types/poke-api';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useQuery} from '@tanstack/react-query';
import {pokemonListQuery} from '../queries/pokemon-queries';
import {Messages} from 'primereact/messages';
import AllPokemonNavBar from '../components/AllPokemonNavbar';
import Loader from '../components/Loader';

export default function AllPokemon() {
  const [initialPokemons, setInitialPokemons] = useState<ApiNamedResource[]>([]);
  const [pokemons, setPokemons] = useState<ApiNamedResource[]>([]);
  const {isLoading, isError, data, error} = useQuery(pokemonListQuery);
  const messages = useRef<Messages>(null);

  useEffect(() => {
    messages.current?.show({
      severity: 'error', sticky: true, detail: (error as Error)?.message
    });
    if (data) {
      setInitialPokemons(data.results);
      setPokemons(data.results);
    }
  }, [error, data, isLoading, isError]);

  const onSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (initialPokemons) {
      const searchedValue = e.target.value.toLowerCase();
      const filteredPokemons = initialPokemons.filter(p => p.name.includes(searchedValue));
      setPokemons(filteredPokemons);
    }
  }, [initialPokemons, pokemons]);

  const content = (() => {
    if (isLoading) return <Loader/>;

    if (isError)
      return (
          <div className="grid">
            <Messages ref={messages} className="col-10 col-offset-1"/>
          </div>
      );

    return <PokemonList pokemons={pokemons}/>;
  })();

  return (
      <>
        <AllPokemonNavBar onSearch={onSearch}/>

        <div className="px-5">
          {content}
        </div>
      </>
  );
}
