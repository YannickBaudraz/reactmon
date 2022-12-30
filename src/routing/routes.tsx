import {RouteObject} from 'react-router-dom';
import AllPokemon from '../views/AllPokemon';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <AllPokemon />
  }
];
