import {ApiNamedResource} from '../types/poke-api';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {useQuery} from '@tanstack/react-query';
import {pokemonListQuery} from '../queries/pokemon-queries';
import {Messages} from 'primereact/messages';
import AllPokemonNavBar from '../components/Nav/AllPokemonNavbar';
import Loader from '../components/Loader';
import PokemonItem from '../components/PokemonItem/PokemonItem';
import {getIdFromPokeApiURl} from '../lib/pokemon';

export default function AllPokemon() {
  const [initialPokemons, setInitialPokemons] = useState<ApiNamedResource[]>([]);
  const [searchInputValue, setSearchInputValue] = useState('');
  const {isLoading, isError, data, error} = useQuery(pokemonListQuery);
  const messages = useRef<Messages>(null);

  useEffect(() => {
    messages.current?.show({
      severity: 'error', sticky: true, detail: (error as Error)?.message
    });
    if (data) {
      setInitialPokemons(data.results);
    }
  }, [error, data, isLoading, isError]);

  const filteredPokemons = useMemo(() => {
    if (!initialPokemons) return initialPokemons;
    const searchedValue = new RegExp(searchInputValue.toLowerCase());
    return initialPokemons.filter(({name, url}) => {
      return searchedValue.test(name + getIdFromPokeApiURl(url));
    });
  }, [initialPokemons, searchInputValue]);

  const onSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInputValue(e.target.value);
  }, []);

  const content = (() => {
    if (isLoading) return <Loader/>;

    if (isError)
      return (
          <div className="grid">
            <Messages ref={messages} className="col-10 col-offset-1"/>
          </div>
      );

    return <>
      <h1>Pokemons</h1>

      <div className="grid flex-wrap lg:mx-2 justify-content-center"
           style={{gridAutoRows: '1fr'}}
      >
        {filteredPokemons.map(pokemon =>
            <div key={pokemon.name}
                 className="p-reset col-6 md:col-3 lg:col-2 xl:col-2 xxl:col-1"
            >
              <PokemonItem
                  pokemon={pokemon}
              />
            </div>
        )}
      </div>
    </>;
  })();

  return <>
    <AllPokemonNavBar onSearch={onSearch}/>

    <div className="mx-2 sm:mx-3 md:mx-5">
      {content}
    </div>
  </>;
}
