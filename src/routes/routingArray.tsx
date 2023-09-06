import { RouteObject } from 'react-router-dom';
import ForgetPassword from '@containers/Auth/ForgetPassword';
import SignIn from '@containers/Auth/SignIn';
import NewPassword from '@containers/Auth/NewPassword';
import SuccessPage from '@containers/Auth/SuccessPage';
import Home from '@containers/Home';
import Dashboard from '@containers/Dashboard';
import NotFound from '@containers/NotFound';
import Layout from 'src/Layout';
import PAGE_ROUTES from '@routes/routingEnum';
import ConfirmEmail from '@containers/Auth/ConfirmEmail';

import ProductsRoutes from './Products';
import AdministrationRoutes from './Administration';
import CMSRoutes from './CMS';
import OrdersRoutes from './Orders';
import CustomersRoutes from './Customers';

export type CustomRouteObject = RouteObject & {
  isPublic?: boolean;
}

export const routingArray: CustomRouteObject[] = [
  { path: PAGE_ROUTES.HOME, element: <Home />, isPublic: true },
  { path: PAGE_ROUTES.FORGET_PASSWORD, element: <ForgetPassword />, isPublic: true },
  { path: PAGE_ROUTES.NEW_PASSWORD, element: <NewPassword />, isPublic: true },
  { path: PAGE_ROUTES.RESEND_PASSWORD, element: <SuccessPage />, isPublic: true },
  { path: PAGE_ROUTES.SIGN_IN, element: <SignIn />, isPublic: true },
  { path: PAGE_ROUTES.CONFIRM_EMAIL, element: <ConfirmEmail />, isPublic: true },
  { path: '*', element: <NotFound />, isPublic: true },
  {
    element: <Layout />,
    children: [
      { path: PAGE_ROUTES.DASHBOARD, element: <Dashboard /> },
      OrdersRoutes,
      ProductsRoutes,
      CustomersRoutes,
      AdministrationRoutes,
      CMSRoutes,
    ],
  },
];
