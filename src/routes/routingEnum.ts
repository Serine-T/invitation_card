enum PAGE_ROUTES {
  HOME = '/',
  FORGET_PASSWORD = '/forget-password',
  NEW_PASSWORD = '/new-password/:token',
  RESEND_PASSWORD = '/resend-password',
  CONFIRM_EMAIL = '/confirm-email/:token',
  SIGN_IN = '/sign-in',
  DASHBOARD = '/dashboard',
  ORDERS = '/orders',
  PRODUCTS = '/products',
  CUSTOMERS = '/customers',
  ADMINISTRATION = '/administration',
  CMS = '/cms',
  OPEN_JOBS = '/orders/open-jobs',
  COMPLETED_JOBS = '/orders/completed-jobs',
  CANCELLED_JOBS = '/orders/cancelled-jobs',
  OPEN_ORDERS_INVOICES = '/orders/open-orders-invoices',
  COMPLETED_ORDER_INVOICES = '/orders/completed-order-invoices',
  OPEN_ESTIMATES = '/orders/open-estimates',
  COMPLETE_ESTIMATES = '/orders/complete-estimates',
  EMAIL_TEMPLATES = '/orders/email-templates',
  PROCUREMENT_REPORT = '/orders/procurement-report',
  SEND_A_FILE = '/orders/send-a-file',
  PRODUCTS_PRODUCTS = '/products/products',
  PRODUCT_CATEGORIES = '/products/product-categories',
  ADD_PRODUCT_CATEGORIES = '/products/product-categories/add',
  EDIT_PRODUCT_CATEGORIES = '/products/product-categories/edit/:id',
  MENU_CATEGORIES = '/products/menu-categories',
  ADD_MENU_CATEGORY = '/products/menu-categories/add',
  EDIT_MENU_CATEGORY = '/products/menu-categories/edit/:id',
  ATTRIBUTE_CATEGORIES = '/products/attribute-categories',
  ADD_ATTRIBUTE_CATEGORIES = '/products/attribute-categories/add',
  EDIT_ATTRIBUTE_CATEGORIES = '/products/attribute-categories/edit/:id',
  ATTRIBUTES = '/products/attributes',
  ADD_ATTRIBUTE = '/products/attributes/add',
  EDIT_ATTRIBUTE = '/products/attributes/edit/:id',
  MAILING_SERVICE_FEES = '/products/mailing-service-fees',
  IMPORT_PRODUCT_PRICING = '/products/import-product-pricing',
  TEMPLATES = '/products/templates',
  ADD_TEMPLATE = '/products/templates/add',
  EDIT_TEMPLATE = '/products/templates/edit/:id',
  TEMPLATE_CATEGORIES = '/products/template-categories',
  ADD_TEMPLATE_CATEGORY = '/products/template-categories/add',
  EDIT_TEMPLATE_CATEGORY = '/products/template-categories/edit/:id',
  CUSTOMERS_CUSTOMERS = '/customers/customers',
  RESELLERS_PENDING = '/customers/resellers-pending',
  NON_PROFIT_PENDING = '/customers/non-profit-pending',
  PROCUREMENT_CUSTOMERS = '/customers/procurement-customers',
  CONTACT_FORM_MESSAGE = '/customers/contact-form-message',
  TASKS = '/administration/tasks',
  USERS = '/administration/users',
  ADD_USER = '/administration/users/add-user',
  EDIT_USER = '/administration/users/edit-user/:id',
  PROMOTIONAL_CODES = '/administration/promotional-codes',
  SHIPPING_ZIPS = '/administration/shipping-zips',
  SHIPPING_RATE_MARKUP = '/administration/shipping-rate-markup',
  HOMEPAGE = '/cms/homepage',
  ADD_BANNER = '/cms/homepage/add-banner',
  EDIT_BANNER = '/cms/homepage/edit/:id',
  BEST_SELLER = '/cms/best-seller',
  ADD_BEST_SELLER = '/cms/best-seller/add',
  EDIT_BEST_SELLER = '/cms/best-seller/edit/:id',
}
export default PAGE_ROUTES;
