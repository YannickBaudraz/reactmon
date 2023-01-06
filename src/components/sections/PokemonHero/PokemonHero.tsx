import React from 'react';
import {Pokemon} from '../../../types/pokemon';
import {PokemonHeader} from './PokemonHeader';
import {PokemonInfo} from './PokemonInfo';

export function PokemonHero({pokemon}: { pokemon: Pokemon }) {
  return (
      <div className="flex flex-column justify-content-around"
           style={{height: 'calc(100vh - 4rem)'}}
      >
        <PokemonHeader pokemon={pokemon}/>
        <PokemonInfo pokemon={pokemon}/>
      </div>
  );
}
