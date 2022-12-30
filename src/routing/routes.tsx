import {RouteObject} from 'react-router-dom';
import AllPokemon from '../views/AllPokemon';
import PokemonDetail from '../views/PokemonDetail';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <AllPokemon />
  },
  {
    path: '/pokemon/:id',
    element: <PokemonDetail />
  }
];
