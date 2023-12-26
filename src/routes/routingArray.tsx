import { RouteObject } from 'react-router-dom';
import Home from '@containers/Home';
import NotFound from '@containers/NotFound';
import Layout from 'src/Layout';
import PAGE_ROUTES from '@routes/routingEnum';

export type CustomRouteObject = RouteObject & {
  isPublic?: boolean;
}

export const routingArray: CustomRouteObject[] = [
  { path: PAGE_ROUTES.HOME, element: <Home />, isPublic: true },
  { path: '*', element: <NotFound />, isPublic: true },
  {
    element: <Layout />,
    children: [

    ],
  },
];
