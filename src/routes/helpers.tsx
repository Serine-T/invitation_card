import { Navigate } from 'react-router-dom';
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
import Layout from 'src/Layout';
import { PAGE_ROUTES } from '@customTypes/enums/routes';

export const routingArray = [
  { path: '/', element: <Home /> },
  { path: PAGE_ROUTES.FORGET_PASSWORD, element: <ForgetPassword /> },
  { path: PAGE_ROUTES.NEW_PASSWORD, element: <NewPassword /> },
  { path: PAGE_ROUTES.RESEND_PASSWORD, element: <SuccessPage /> },
  { path: PAGE_ROUTES.SIGN_IN, element: <SignIn /> },

  {
    element: <Layout />,
    children: [
      { path: PAGE_ROUTES.DASHBOARD, element: <Dashboard /> },
      {
        path: '/orders',
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
      },
      {
        path: PAGE_ROUTES.PRODUCTS,
        children: [
          { element: <Navigate to={PAGE_ROUTES.PRODUCTS_PRODUCTS} />, index: true },
          { path: PAGE_ROUTES.PRODUCTS_PRODUCTS, element: <Products /> },
          { path: PAGE_ROUTES.PRODUCT_CATEGORIES, element: <ProductCategories /> },
          { path: PAGE_ROUTES.MENU_CATEGORIES, element: <MenuCategories /> },
          { path: PAGE_ROUTES.ATTRIBUTE_CATEGORIES, element: <AttributeCategories /> },
          { path: PAGE_ROUTES.ATTRIBUTES, element: <Attributes /> },
          { path: PAGE_ROUTES.MAILING_SERVICE_FEES, element: <MailingServiceFees /> },
          { path: PAGE_ROUTES.IMPORT_PRODUCT_PRICING, element: <ImportProductPricing /> },
          { path: PAGE_ROUTES.TEMPLATES, element: <Templates /> },
          { path: PAGE_ROUTES.TEMPLATE_CATEGORIES, element: <TemplateCategories /> },
        ],
      },

      {
        path: PAGE_ROUTES.CUSTOMERS,
        children: [
          { element: <Navigate to={PAGE_ROUTES.CUSTOMERS_CUSTOMERS} />, index: true },
          { path: PAGE_ROUTES.CUSTOMERS_CUSTOMERS, element: <Customers /> },
          { path: PAGE_ROUTES.RESELLERS_PENDING, element: <ResellersPending /> },
          { path: PAGE_ROUTES.NON_PROFIT_PENDING, element: <NonProfitPending /> },
          { path: PAGE_ROUTES.PROCUREMENT_CUSTOMERS, element: <ProcurementCustomers /> },
          { path: PAGE_ROUTES.CONTACT_FORM_MESSAGE, element: <ContactFormMessage /> },

        ],
      },
      {
        path: PAGE_ROUTES.ADMINISTRATION,
        children: [
          { element: <Navigate to={PAGE_ROUTES.TASKS} />, index: true },
          { path: PAGE_ROUTES.TASKS, element: <Tasks /> },
          { path: PAGE_ROUTES.USERS, element: <Users /> },
          { path: PAGE_ROUTES.PROMOTIONAL_CODES, element: <PromotionalCodes /> },
          { path: PAGE_ROUTES.SHIPPING_ZIPS, element: <ShippingZips /> },
          { path: PAGE_ROUTES.SHIPPING_RATE_MARKUP, element: <ShippingRateMarkup /> },
        ],
      },
      {
        path: PAGE_ROUTES.CMS,
        children: [
          { element: <Navigate to={PAGE_ROUTES.HOMEPAGE} />, index: true },
          { path: PAGE_ROUTES.HOMEPAGE, element: <Homepage /> },
        ],
      },
      { path: '*', element: <NotFound /> },
    ],
  },

];
