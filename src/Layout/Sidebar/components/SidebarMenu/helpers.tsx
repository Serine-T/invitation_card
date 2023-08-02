import PAGE_ROUTES from '@routes/routingEnum';

export interface INavBarChildrenItem {
  path: PAGE_ROUTES;
  title: string;
}
export interface INavBarItem {
  id: string;
  title: string;
  path: PAGE_ROUTES;
  children?: INavBarChildrenItem[];
}

const navData: INavBarItem[] = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    path: PAGE_ROUTES.DASHBOARD,
  },
  {
    id: 'orders',
    title: 'Orders',
    path: PAGE_ROUTES.ORDERS,
    children: [
      { path: PAGE_ROUTES.OPEN_JOBS, title: 'Open Jobs' },
      { path: PAGE_ROUTES.COMPLETED_JOBS, title: 'Completed Jobs' },
      { path: PAGE_ROUTES.CANCELLED_JOBS, title: 'Cancelled Jobs' },
      { path: PAGE_ROUTES.OPEN_ORDERS_INVOICES, title: 'Open Orders Invoices' },
      { path: PAGE_ROUTES.COMPLETED_ORDER_INVOICES, title: 'Completed Order Invoices' },
      { path: PAGE_ROUTES.OPEN_ESTIMATES, title: 'Open Estimates' },
      { path: PAGE_ROUTES.COMPLETE_ESTIMATES, title: 'Complete Estimates' },
      { path: PAGE_ROUTES.EMAIL_TEMPLATES, title: 'Email Templates' },
      { path: PAGE_ROUTES.PROCUREMENT_REPORT, title: 'Procurement Report' },
      { path: PAGE_ROUTES.SEND_A_FILE, title: 'Send A File' },
    ],
  },
  {
    id: 'products',
    title: 'Products',
    path: PAGE_ROUTES.PRODUCTS,
    children: [
      { path: PAGE_ROUTES.PRODUCTS_PRODUCTS, title: 'Products' },
      { path: PAGE_ROUTES.PRODUCT_CATEGORIES, title: 'Product Categories' },
      { path: PAGE_ROUTES.MENU_CATEGORIES, title: 'Menu Categories' },
      { path: PAGE_ROUTES.ATTRIBUTE_CATEGORIES, title: 'Attribute Categories' },
      { path: PAGE_ROUTES.ATTRIBUTES, title: 'Attributes' },
      { path: PAGE_ROUTES.MAILING_SERVICE_FEES, title: 'Mailing Service Fees' },
      { path: PAGE_ROUTES.IMPORT_PRODUCT_PRICING, title: 'Import Product Pricing' },
      { path: PAGE_ROUTES.TEMPLATES, title: 'Templates' },
      { path: PAGE_ROUTES.TEMPLATE_CATEGORIES, title: 'Template Categories' },
    ],
  },
  {
    id: 'customers',
    title: 'Customers',
    path: PAGE_ROUTES.CUSTOMERS,
    children: [
      { path: PAGE_ROUTES.CUSTOMERS_CUSTOMERS, title: 'Customers' },
      { path: PAGE_ROUTES.RESELLERS_PENDING, title: 'Resellers Pending' },
      { path: PAGE_ROUTES.NON_PROFIT_PENDING, title: 'Non-Profit Pending' },
      { path: PAGE_ROUTES.PROCUREMENT_CUSTOMERS, title: 'Procurement Customers' },
      { path: PAGE_ROUTES.CONTACT_FORM_MESSAGE, title: 'Contact Form Message' },
    ],
  },
  {
    id: 'administration',
    title: 'Administration',
    path: PAGE_ROUTES.ADMINISTRATION,
    children: [
      { path: PAGE_ROUTES.TASKS, title: 'Tasks' },
      { path: PAGE_ROUTES.USERS, title: 'Users' },
      { path: PAGE_ROUTES.PROMOTIONAL_CODES, title: 'Promotional Codes' },
      { path: PAGE_ROUTES.SHIPPING_ZIPS, title: 'Shipping Zips' },
      { path: PAGE_ROUTES.SHIPPING_RATE_MARKUP, title: 'Shipping Rate Markup' },
    ],
  },
  {
    id: 'cms',
    title: 'CMS',
    path: PAGE_ROUTES.CMS,
    children: [
      { path: PAGE_ROUTES.HOMEPAGE, title: 'Homepage' },
    ],
  },
];

export default navData;
