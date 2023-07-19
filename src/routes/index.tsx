import { Navigate, useRoutes } from 'react-router-dom';
import ForgetPassword from '@containers/Auth/ForgetPassword';
import SignIn from '@containers/Auth/SignIn';
import NewPassword from '@containers/Auth/NewPassword';
import SuccessPage from '@containers/Auth/SuccessPage';
import Home from '@containers/Home';
import Dashboard from '@containers/Dashboard';
import NotFound from '@containers/NotFound';
import AttributeCategories from '@containers/Products/AttributeCategories';
import Attributes from '@containers/Products/Attributes';
import ImportProductPricing from '@containers/Products/ImportProductPricing';
import MailingServiceFees from '@containers/Products/MailingServiceFees';
import MenuCategories from '@containers/Products/MenuCategories';
import ProductCategories from '@containers/Products/ProductCategories';
import Products from '@containers/Products/Products';
import TemplateCategories from '@containers/Products/TemplateCategories';
import Templates from '@containers/Products/Templates';
import CancelledJobs from '@containers/Orders/CancelledJobs';
import CompletedJobs from '@containers/Orders/CompletedJobs';
import CompletedOrderInvoices from '@containers/Orders/CompletedOrderInvoices';
import CompleteEstimates from '@containers/Orders/CompleteEstimates';
import EmailTemplates from '@containers/Orders/EmailTemplates';
import OpenOrdersInvoices from '@containers/Orders/OpenOrdersInvoices';
import OpenJobs from '@containers/Orders/OpenJobs';
import ProcurementReport from '@containers/Orders/ProcurementReport';
import SendAFile from '@containers/Orders/SendAFile';
import OpenEstimates from '@containers/Orders/OpenEstimates';
import ContactFormMessage from '@containers/Customers/ContactFormMessage';
import Customers from '@containers/Customers/Customers';
import NonProfitPending from '@containers/Customers/NonProfitPending';
import ProcurementCustomers from '@containers/Customers/ProcurementCustomers';
import ResellersPending from '@containers/Customers/ResellersPending ';
import Users from '@containers/Administration/Users';
import Tasks from '@containers/Administration/Tasks';
import ShippingZips from '@containers/Administration/ShippingZips';
import ShippingRateMarkup from '@containers/Administration/ShippingRateMarkup';
import PromotionalCodes from '@containers/Administration/PromotionalCodes';
import Homepage from '@containers/CMS/Homepage';
import DashboardLayout from '@containers/layouts/dashboard/DashboardLayout';

export default function Router() {
  const routes = useRoutes([
    { path: '/', element: <Home /> },
    { path: '/dashboard', element: <Dashboard /> },
    { path: '/forget-password', element: <ForgetPassword /> },
    { path: '/new-password', element: <NewPassword /> },
    { path: '/resend-password', element: <SuccessPage /> },
    { path: 'sign-in', element: <SignIn /> },
    {
      element: <DashboardLayout />,
      children: [
        {
          path: '/products',
          element: <DashboardLayout />,
          children: [
            { element: <Navigate to="/products/attribute-categories" />, index: true },
            { path: '/products/attribute-categories', element: <AttributeCategories /> },
            { path: '/products/attributes', element: <Attributes /> },
            { path: '/products/import-product-pricing', element: <ImportProductPricing /> },
            { path: '/products/mailing-service-fees', element: <MailingServiceFees /> },
            { path: '/products/menu-categories', element: <MenuCategories /> },
            { path: '/products/product-categories', element: <ProductCategories /> },
            { path: '/products/products', element: <Products /> },
            { path: '/products/template-categories', element: <TemplateCategories /> },
            { path: '/products/templates', element: <Templates /> },
          ],
        },
        {
          path: '/orders',
          children: [
            { element: <Navigate to="/orders/cancelled-jobs" />, index: true },
            { path: '/orders/cancelled-jobs', element: <CancelledJobs /> },
            { path: '/orders/completed-jobs', element: <CompletedJobs /> },
            { path: '/orders/completed-order-invoices', element: <CompletedOrderInvoices /> },
            { path: '/orders/complete-estimates', element: <CompleteEstimates /> },
            { path: '/orders/email-templates', element: <EmailTemplates /> },
            { path: '/orders/open-estimates', element: <OpenEstimates /> },
            { path: '/orders/open-jobs', element: <OpenJobs /> },
            { path: '/orders/open-orders-invoices', element: <OpenOrdersInvoices /> },
            { path: '/orders/procurement-report', element: <ProcurementReport /> },
            { path: '/orders/send-a-file', element: <SendAFile /> },
          ],
        },
        {
          path: '/customers',
          children: [
            { element: <Navigate to="/customers/contact-for-mmessage" />, index: true },
            { path: '/customers/contact-for-mmessage', element: <ContactFormMessage /> },
            { path: '/customers/customers', element: <Customers /> },
            { path: '/customers/non-profit-pending', element: <NonProfitPending /> },
            { path: '/customers/procurement-customers', element: <ProcurementCustomers /> },
            { path: '/customers/resellers-pending ', element: <ResellersPending /> },
          ],
        },
        {
          path: '/administration',
          children: [
            { element: <Navigate to="/administration/users" />, index: true },
            { path: '/administration/users', element: <Users /> },
            { path: '/administration/tasks', element: <Tasks /> },
            { path: '/administration/shippingzips', element: <ShippingZips /> },
            { path: '/administration/shippingratemarkup', element: <ShippingRateMarkup /> },
            { path: '/administration/promotionalcodes ', element: <PromotionalCodes /> },
          ],
        },
        {
          path: '/cms',
          children: [
            { element: <Navigate to="/cms/homepage" />, index: true },
            { path: '/cms/homepage', element: <Homepage /> },
          ],
        },
        { path: '*', element: <NotFound /> },
      ],
    },

  ]);

  return routes;
}
