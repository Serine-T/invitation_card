import { Navigate } from 'react-router-dom';
import PAGE_ROUTES from '@routes/routingEnum';
import Homepage from '@containers/CMS/Homepage';
import AddBanner from '@containers/CMS/Homepage/AddBanner';
import EditBanner from '@containers/CMS/Homepage/EditBanner';
import BestSeller from '@containers/CMS/BestSeller';
import AddBestSeller from '@containers/CMS/BestSeller/AddBestSeller';
import EditBestSeller from '@containers/CMS/BestSeller/EditBestSeller';

const CMSRoutes = {
  path: PAGE_ROUTES.CMS,
  children: [
    { element: <Navigate to={PAGE_ROUTES.HOMEPAGE} />, index: true },
    {
      path: PAGE_ROUTES.HOMEPAGE,
      children: [
        { element: <Homepage />, index: true },
        { path: PAGE_ROUTES.ADD_BANNER, element: <AddBanner /> },
        { path: PAGE_ROUTES.EDIT_BANNER, element: <EditBanner /> },
      ],
    },
    {
      path: PAGE_ROUTES.BEST_SELLER,
      children: [
        { element: <BestSeller />, index: true },
        { path: PAGE_ROUTES.ADD_BEST_SELLER, element: <AddBestSeller /> },
        { path: PAGE_ROUTES.EDIT_BEST_SELLER, element: <EditBestSeller /> },
      ],
    },
  ],
};

export default CMSRoutes;
