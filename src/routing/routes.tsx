import {RouteObject} from 'react-router-dom';
import {lazy} from 'react';

const AllPokemon = lazy(() => import('../views/AllPokemon'));
const PokemonDetails = lazy(() => import('../views/PokemonDetails'));

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <AllPokemon/>
  },
  {
    path: '/pokemon/:id',
    element: <PokemonDetails/>
  }
];
