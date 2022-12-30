import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import {routes} from './routes';

const browserRouter = createBrowserRouter(routes);

export default function Router() {
  return (
      <RouterProvider router={browserRouter}/>
  );
}
