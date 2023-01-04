import React, {useEffect, useRef, useState} from 'react';
import {Pokemon} from '../../types/pokemon';
import {PokemonHeader} from './PokemonHeader';
import {PokemonInfo} from './PokemonInfo';

export function PokemonHero({pokemon}: { pokemon: Pokemon }) {
  const topRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (topRef.current)
      setHeight(topRef.current.getBoundingClientRect().top);
  }, [pokemon]);

  return (
      <div
          ref={topRef}
          style={{height: window.innerHeight - height}}
          className="mt-8"
      >
        <PokemonHeader pokemon={pokemon}/>
        <div className="mt-8">
          <PokemonInfo pokemon={pokemon}/>
        </div>
      </div>
  );
}
