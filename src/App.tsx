import React, {useCallback, useEffect, useRef, useState} from 'react';
import Layout from './views/Layout';
import AllPokemon from './views/AllPokemon';
import {useQuery} from '@tanstack/react-query';
import {pokemonListQuery} from './queries/pokemon-queries';
import {Messages} from 'primereact/messages';
import {ProgressSpinner} from 'primereact/progressspinner';
import {IPokemonBulkResult} from './types/poke-api';

function App() {
  const [initialPokemons, setInitialPokemons] = useState<IPokemonBulkResult[]>([]);
  const [pokemons, setPokemons] = useState<IPokemonBulkResult[]>([]);
  const {isLoading, isError, data, error} = useQuery(pokemonListQuery);
  const messages = useRef<Messages>(null);
  let content;

  useEffect(() => {
    messages.current?.show({
      severity: 'error', sticky: true, detail: (error as Error)?.message
    });
    if (data) {
      setInitialPokemons(data.results);
      setPokemons(data.results);
    }
  }, [error, data, isLoading, isError]);

  if (isLoading) {
    content = <div className="flex justify-content-center"><ProgressSpinner/></div>;
  } else if (isError) {
    content = <div className="grid">
      <Messages ref={messages} className="col-10 col-offset-1"/>
    </div>;
  } else {
    content = <AllPokemon pokemons={pokemons}/>;
  }

  const onSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (initialPokemons) {
      const searchedValue = e.target.value.toLowerCase();
      const filteredPokemons = initialPokemons.filter(p => p.name.includes(searchedValue));
      setPokemons(filteredPokemons);
    }
  }, [pokemons]);

  return (
      <Layout navBarProps={{onSearch}}>
        {content}
      </Layout>
  );
}

export default App;
