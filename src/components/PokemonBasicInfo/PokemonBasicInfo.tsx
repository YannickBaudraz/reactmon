import React from 'react';
import {Pokemon} from '../../types/pokemon';

import './PokemonBasicInfo.scss';

export function PokemonBasicInfo({pokemon}: { pokemon: Pokemon }) {
  return (
      <>
        <table className="p-reset">
          <tbody>
          <tr>
            <th>ID</th>
            <td>{pokemon?.id}</td>
          </tr>
          <tr>
            <th>Name</th>
            <td>{pokemon?.name.capitalize()}</td>
          </tr>
          <tr>
            <th>Height</th>
            <td>{pokemon?.height / 10}m</td>
          </tr>
          <tr>
            <th>Weight</th>
            <td>{pokemon?.weight / 10}kg</td>
          </tr>
          <tr>
            <th>{pokemon.abilities.length > 1 ? 'Abilities': 'Ability'}</th>
            <td>{pokemon?.abilities.map(ability => ability.name?.capitalize()).join(', ')}</td>
          </tr>
          <tr>
            <th>{pokemon.types.length > 1 ? 'Types': 'Type'}</th>
            <td>{pokemon?.types.map(type => type.name?.capitalize()).join(', ')}</td>
          </tr>
          {pokemon.forms?.length > 1 && (
              <tr>
                <th>Forms</th>
                <td>{pokemon?.forms.map(form => form.name?.capitalize()).join(', ')}</td>
              </tr>
          )}
          </tbody>
        </table>
      </>
  );
}
