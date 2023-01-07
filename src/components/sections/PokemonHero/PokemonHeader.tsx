import {Link} from 'react-router-dom';
import React, {useEffect, useRef} from 'react';
import {Pokemon} from '../../../types/pokemon';
import {PokemonTitle} from '../../PokemonTitle';
import {LAST_POKEMON_ID} from '../../../services/poke-api.service';
import {PokemonThemedButton} from '../../PokemonThemedButton';
import {AnimeTarget} from '../../../types/anime-js';
import {SetState} from '../../../types/react';

interface PokemonHeaderProps {
  pokemon: Pokemon;
  setHeaderAnimeTarget?: SetState<AnimeTarget>;
}

export function PokemonHeader({pokemon, setHeaderAnimeTarget}: PokemonHeaderProps) {
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setHeaderAnimeTarget?.(titleRef.current);
  }, [pokemon]);

  return (
      <div className="grid">
        <div className="col-4 flex align-items-center pl-8">
          {pokemon.id > 1 &&
              <Link to={`/pokemon/${pokemon.id - 1}`}>
                <PokemonThemedButton
                    label="Previous"
                    icon="pi pi-arrow-left"
                    color={pokemon.color}
                />
              </Link>
          }
        </div>

        <div ref={titleRef} className="col-4 flex justify-content-center align-items-center">
          <PokemonTitle name={pokemon?.name}/>
        </div>

        <div className="col-4 flex justify-content-end align-items-center pr-8">
          {pokemon.id < LAST_POKEMON_ID &&
              <Link to={`/pokemon/${pokemon.id + 1}`}>
                <PokemonThemedButton
                    label="Next"
                    icon="pi pi-arrow-right"
                    iconPos="right"
                    color={pokemon.color}
                />
              </Link>
          }
        </div>
      </div>
  );
}
