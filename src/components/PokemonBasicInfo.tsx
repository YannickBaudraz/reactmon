import React from 'react';
import {Pokemon} from '../types/pokemon';

export function PokemonBasicInfo({pokemon}: { pokemon: Pokemon }) {
  return (
      <>
        <table className="p-reset">
          <tbody>
          <tr>
            <th className="text-right">ID</th>
            <td>{pokemon?.id}</td>
          </tr>
          <tr>
            <th className="text-right">Name</th>
            <td>{pokemon?.name.capitalize()}</td>
          </tr>
          <tr>
            <th className="text-right">Height</th>
            <td>{pokemon?.height / 10}m</td>
          </tr>
          <tr>
            <th className="text-right">Weight</th>
            <td>{pokemon?.weight / 10}kg</td>
          </tr>
          <tr>
            <th className="text-right">Abilities</th>
            <td>{pokemon?.abilities.map(ability => ability.name?.capitalize()).join(', ')}</td>
          </tr>
          </tbody>
        </table>
      </>
  );
}
