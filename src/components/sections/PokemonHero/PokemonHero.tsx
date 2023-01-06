import React from 'react';
import {Pokemon} from '../../../types/pokemon';
import {PokemonHeader} from './PokemonHeader';
import {PokemonInfo} from './PokemonInfo';

export function PokemonHero({pokemon}: { pokemon: Pokemon }) {
  return (
      <div className="mt-7 flex flex-column justify-content-center"
           style={{height: 'calc(100vh - 4rem)'}}
      >
        <PokemonHeader pokemon={pokemon}/>
        <div style={{marginTop: '10rem'}}>
          <PokemonInfo pokemon={pokemon}/>
        </div>
      </div>
  );
}
