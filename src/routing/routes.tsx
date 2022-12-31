import {RouteObject} from 'react-router-dom';
import AllPokemon from '../views/AllPokemon';
import PokemonDetails from '../views/PokemonDetails';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <AllPokemon />
  },
  {
    path: '/pokemon/:id',
    element: <PokemonDetails />
  }
];
