import {Link} from 'react-router-dom';
import React, {useEffect, useRef} from 'react';
import {Pokemon} from '../../../types/pokemon';
import PokemonTitle from '../../PokemonTitle';
import {LAST_POKEMON_ID} from '../../../services/poke-api.service';
import PokemonThemedButton from '../../PokemonThemedButton';
import {AnimeTarget} from '../../../types/anime-js';
import {SetState} from '../../../types/react';

interface PokemonHeaderProps {
  pokemon: Pokemon;
  setHeaderAnimeTarget?: SetState<AnimeTarget>;
}

export default function PokemonHeader({pokemon, setHeaderAnimeTarget}: PokemonHeaderProps) {
  const titleDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!titleDivRef.current) return;
    setHeaderAnimeTarget?.(titleDivRef.current);
  }, [pokemon]);

  return (
      <div className="grid">
        <div className="col-6 xl:col
                        flex align-items-center xl:pl-8">
          {pokemon.id > 1 &&
              <Link to={`/pokemon/${pokemon.id - 1}`}>
                <PokemonThemedButton
                    label="&nbsp;Previous"
                    icon="pi pi-arrow-left"
                    color={pokemon.color}
                />
              </Link>
          }
        </div>

        <div className="col-6 xl:col xl:flex-order-3
                        flex justify-content-end align-items-center xl:pr-8"
        >
          {pokemon.id < LAST_POKEMON_ID &&
              <Link to={`/pokemon/${pokemon.id + 1}`}>
                <PokemonThemedButton
                    label="Next&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
                    icon="pi pi-arrow-right"
                    iconPos="right"
                    color={pokemon.color}
                />
              </Link>
          }
        </div>

        <div ref={titleDivRef}
             className="col xl:flex-order-2
                        flex justify-content-center align-items-center"
        >
          <PokemonTitle name={pokemon?.name}/>
        </div>
      </div>
  );
}
