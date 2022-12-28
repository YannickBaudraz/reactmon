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

        <div className="grid px-2 justify-content-center">
          {pokemons.map((pokemon: IPokemonBulkResult) =>
              <PokemonItem
                  pokemon={pokemon}
                  key={pokemon.name}
              />
          )}
        </div>
      </>
  );
}
