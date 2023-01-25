import {RouteObject} from 'react-router-dom';
import React, {lazy} from 'react';
import Root from '../views/Root';

const AllPokemon = lazy(() => import('../views/AllPokemon'));
const PokemonDetails = lazy(() => import('../views/PokemonDetails'));

export const routes: RouteObject[] = [
  {
    element: <Root/>,
    children: [
      {
        index: true,
        element: <AllPokemon/>
      },
      {
        path: 'pokemon/:id',
        element: <PokemonDetails/>
      }
    ]
  }
];
