import { Navigate } from 'react-router-dom';
import PAGE_ROUTES from '@routes/routingEnum';
import CompletedJobs from '@containers/Orders/CompletedJobs';
import CancelledJobs from '@containers/Orders/CancelledJobs';
import CompletedOrderInvoices from '@containers/Orders/CompletedOrderInvoices';
import OpenOrdersInvoices from '@containers/Orders/OpenOrdersInvoices';
import OpenEstimates from '@containers/Orders/OpenEstimates';
import CompleteEstimates from '@containers/Orders/CompleteEstimates';
import EmailTemplates from '@containers/Orders/EmailTemplates';
import OpenJobs from '@containers/Orders/OpenJobs';
import ProcurementReport from '@containers/Orders/ProcurementReport';
import SendAFile from '@containers/Orders/SendAFile';

const OrdersRoutes = {
  path: PAGE_ROUTES.ORDERS,
  children: [
    { element: <Navigate to={PAGE_ROUTES.OPEN_JOBS} />, index: true },
    { path: PAGE_ROUTES.COMPLETED_JOBS, element: <CompletedJobs /> },
    { path: PAGE_ROUTES.CANCELLED_JOBS, element: <CancelledJobs /> },
    { path: PAGE_ROUTES.COMPLETED_ORDER_INVOICES, element: <CompletedOrderInvoices /> },
    { path: PAGE_ROUTES.OPEN_ORDERS_INVOICES, element: <OpenOrdersInvoices /> },
    { path: PAGE_ROUTES.OPEN_ESTIMATES, element: <OpenEstimates /> },
    { path: PAGE_ROUTES.COMPLETE_ESTIMATES, element: <CompleteEstimates /> },
    { path: PAGE_ROUTES.EMAIL_TEMPLATES, element: <EmailTemplates /> },
    { path: PAGE_ROUTES.OPEN_JOBS, element: <OpenJobs /> },
    { path: PAGE_ROUTES.PROCUREMENT_REPORT, element: <ProcurementReport /> },
    { path: PAGE_ROUTES.SEND_A_FILE, element: <SendAFile /> },
  ],
};

export default OrdersRoutes;
