import PromotionalCodes from '@containers/Administration/PromotionalCodes';
import ShippingRateMarkup from '@containers/Administration/ShippingRateMarkup';
import ShippingZips from '@containers/Administration/ShippingZips';
import Tasks from '@containers/Administration/Tasks';
import Users from '@containers/Administration/Users';
import AddUser from '@containers/Administration/Users/AddUser';
import EditUser from '@containers/Administration/Users/EditUser';
import PAGE_ROUTES from '@routes/routingEnum';
import { Navigate } from 'react-router-dom';

const AdministrationRoutes = {
  path: PAGE_ROUTES.ADMINISTRATION,
  children: [
    { element: <Navigate to={PAGE_ROUTES.TASKS} />, index: true },
    { path: PAGE_ROUTES.TASKS, element: <Tasks /> },
    {
      path: PAGE_ROUTES.USERS,
      children: [
        { element: <Users />, index: true },
        { path: PAGE_ROUTES.ADD_USER, element: <AddUser /> },
        { path: PAGE_ROUTES.EDIT_USER, element: <EditUser /> },
      ],
    },
    { path: PAGE_ROUTES.PROMOTIONAL_CODES, element: <PromotionalCodes /> },
    { path: PAGE_ROUTES.SHIPPING_ZIPS, element: <ShippingZips /> },
    { path: PAGE_ROUTES.SHIPPING_RATE_MARKUP, element: <ShippingRateMarkup /> },
  ],
};

export default AdministrationRoutes;
