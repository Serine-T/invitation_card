import { PAGE_ROUTES } from '@customTypes/enums/routes';

const navData = [
  {
    id: 'dashboard',
    title: 'Dashboard',
  },
  {
    id: 'orders',
    title: 'Orders',
    children: [
      { path: PAGE_ROUTES.OPEN_JOBS, title: 'OpenJobs' },
      { path: PAGE_ROUTES.CANCELLED_JOBS, title: 'CancelledJobs' },
      { path: PAGE_ROUTES.COMPLETED_JOBS, title: 'CompletedJobs' },
      { path: PAGE_ROUTES.COMPLETED_ORDER_INVOICES, title: 'CompletedOrderInvoices' },
      { path: PAGE_ROUTES.COMPLETE_ESTIMATES, title: 'CompleteEstimates' },
      { path: PAGE_ROUTES.EMAIL_TEMPLATES, title: 'EmailTemplates' },
      { path: PAGE_ROUTES.OPEN_ESTIMATES, title: 'OpenEstimates' },
      { path: PAGE_ROUTES.OPEN_ORDERS_INVOICES, title: 'OpenOrdersInvoices' },
      { path: PAGE_ROUTES.PROCUREMENT_REPORT, title: 'ProcurementReport' },
      { path: PAGE_ROUTES.SEND_A_FILE, title: 'SendAFile' },
    ],
  },
  {
    id: 'products',
    title: 'Products',
    children: [
      { path: PAGE_ROUTES.PRODUCTS, title: 'Products' },
      { path: PAGE_ROUTES.ATTRIBUTE_CATEGORIES, title: 'AttributeCategories' },
      { path: PAGE_ROUTES.ATTRIBUTES, title: 'Attributes' },
      { path: PAGE_ROUTES.IMPORT_PRODUCT_PRICING, title: 'ImportProductPricing' },
      { path: PAGE_ROUTES.MAILING_SERVICE_FEES, title: 'MailingServiceFees' },
      { path: PAGE_ROUTES.MENU_CATEGORIES, title: 'MenuCategories' },
      { path: PAGE_ROUTES.PRODUCT_CATEGORIES, title: 'ProductCategories' },
      { path: PAGE_ROUTES.TEMPLATE_CATEGORIES, title: 'TemplateCategories' },
      { path: PAGE_ROUTES.TEMPLATES, title: 'Templates' },
    ],
  },
  {
    id: 'customers',
    title: 'Customers',
    children: [
      { path: PAGE_ROUTES.CUSTOMERS, title: 'Customers' },
      { path: PAGE_ROUTES.CONTACT_FORM_MESSAGE, title: 'ContactFormMessage' },
      { path: PAGE_ROUTES.NON_PROFIT_PENDING, title: 'NonProfitPending' },
      { path: PAGE_ROUTES.PROCUREMENT_CUSTOMERS, title: 'ProcurementCustomers' },
      { path: PAGE_ROUTES.RESELLERS_PENDING, title: 'ResellersPending' },
    ],
  },
  {
    id: 'administration',
    title: 'Administration',
    children: [
      { path: PAGE_ROUTES.TASKS, title: 'Tasks' },
      { path: PAGE_ROUTES.USERS, title: 'Users' },
      { path: PAGE_ROUTES.SHIPPING_ZIPS, title: 'ShippingZips' },
      { path: PAGE_ROUTES.SHIPPING_RATE_MARKUP, title: 'ShippingRateMarkup' },
      { path: PAGE_ROUTES.PROMOTIONAL_CODES, title: 'PromotionalCodes' },
    ],
  },
  {
    id: 'cms',
    title: 'CMS',
    children: [
      { path: PAGE_ROUTES.HOMEPAGE, title: 'Homepage' },
    ],
  },
];

export default navData;
