import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import {routes} from './routes';
import {Suspense} from 'react';
import Loader from '../components/Loader';

const browserRouter = createBrowserRouter(routes);

export default function Router() {
  return (
      <Suspense fallback={<Loader/>}>
        <RouterProvider router={browserRouter}/>
      </Suspense>
  );
}
