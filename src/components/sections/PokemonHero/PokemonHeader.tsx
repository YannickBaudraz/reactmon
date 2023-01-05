import {Link} from 'react-router-dom';
import React from 'react';
import {Pokemon} from '../../../types/pokemon';
import {PokemonTitle} from '../../PokemonTitle';
import {LAST_POKEMON_ID} from '../../../services/poke-api.service';
import {PokemonThemedButton} from '../../PokemonThemedButton';

export function PokemonHeader({pokemon}: { pokemon: Pokemon }) {
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

        <div className="col-4 flex justify-content-center align-items-center">
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
