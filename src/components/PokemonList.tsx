import React from 'react';
import PokemonItem from './PokemonItem/PokemonItem';
import {IPokemonBulkResult} from '../types/poke-api';

interface PokemonListProps {
  pokemons: IPokemonBulkResult[];
}

export default function PokemonList({pokemons}: PokemonListProps) {
  return (
      <>
        <h1>Pokemons</h1>

        <div className="grid mx-1 lg:mx-2 gap-3 lg:gap-5 justify-content-center">
          {pokemons.map((pokemon: IPokemonBulkResult) =>
              <a href="#" className="p-reset">
                <PokemonItem
                    pokemon={pokemon}
                    key={pokemon.name}
                />
              </a>
          )}
        </div>
      </>
  );
}
