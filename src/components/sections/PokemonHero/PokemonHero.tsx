import React from 'react';
import {Pokemon} from '../../../types/pokemon';
import {PokemonHeader} from './PokemonHeader';
import {PokemonInfo} from './PokemonInfo';

export function PokemonHero({pokemon}: { pokemon: Pokemon }) {
  return (
      <div className="mt-8" style={{height: 'calc(100vh - 8rem)'}}>
        <PokemonHeader pokemon={pokemon}/>
        <div className="mt-8">
          <PokemonInfo pokemon={pokemon}/>
        </div>
      </div>
  );
}
