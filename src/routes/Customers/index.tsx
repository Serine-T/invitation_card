import { Navigate } from 'react-router-dom';
import PAGE_ROUTES from '@routes/routingEnum';
import Customers from '@containers/Customers/Customers';
import ResellersPending from '@containers/Customers/ResellersPending ';
import ProcurementCustomers from '@containers/Customers/ProcurementCustomers';
import NonProfitPending from '@containers/Customers/NonProfitPending';
import ContactFormMessage from '@containers/Customers/ContactFormMessage';

const CustomersRoutes = {
  path: PAGE_ROUTES.CUSTOMERS,
  children: [
    { element: <Navigate to={PAGE_ROUTES.CUSTOMERS_CUSTOMERS} />, index: true },
    { path: PAGE_ROUTES.CUSTOMERS_CUSTOMERS, element: <Customers /> },
    { path: PAGE_ROUTES.RESELLERS_PENDING, element: <ResellersPending /> },
    { path: PAGE_ROUTES.NON_PROFIT_PENDING, element: <NonProfitPending /> },
    { path: PAGE_ROUTES.PROCUREMENT_CUSTOMERS, element: <ProcurementCustomers /> },
    { path: PAGE_ROUTES.CONTACT_FORM_MESSAGE, element: <ContactFormMessage /> },
  ],
};

export default CustomersRoutes;
