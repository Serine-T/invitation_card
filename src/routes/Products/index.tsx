import { Navigate } from 'react-router-dom';
import AttributeCategories from '@containers/Products/AttributeCategories';
import AddAttributeCategory from '@containers/Products/AttributeCategories/AddAttributeCategory';
import EditAttributeCategory from '@containers/Products/AttributeCategories/EditAttributeCategory';
import Attributes from '@containers/Products/Attributes';
import AddAttribute from '@containers/Products/Attributes/AddAttribute';
import EditAttribute from '@containers/Products/Attributes/EditAttribute';
import ImportProductPricing from '@containers/Products/ImportProductPricing';
import MailingServiceFees from '@containers/Products/MailingServiceFees';
import MenuCategories from '@containers/Products/MenuCategories';
import AddMenuCategory from '@containers/Products/MenuCategories/AddMenuCategory';
import EditMenuCategory from '@containers/Products/MenuCategories/EditMenuCategory';
import ProductCategories from '@containers/Products/ProductCategories';
import AddProductCategory from '@containers/Products/ProductCategories/AddComponent';
import EditProductCategory from '@containers/Products/ProductCategories/EditComponent';
import Products from '@containers/Products/Products';
import AddProduct from '@containers/Products/Products/components/Tabs/BasicInfo/AddComponent';
import EditProduct from '@containers/Products/Products/components/Tabs/BasicInfo/EditComponent';
import TemplateCategories from '@containers/Products/TemplateCategories';
import Templates from '@containers/Products/Templates';
import PAGE_ROUTES from '@routes/routingEnum';
import AddTemplateCategory from '@containers/Products/TemplateCategories/AddTemplateCategory';
import EditTemplateCategory from '@containers/Products/TemplateCategories/EditTemplateCategory';
import AddTemplate from '@containers/Products/Templates/AddTemplate';
import EditTemplate from '@containers/Products/Templates/EditTemplate';

const ProductsRoutes = {
  path: PAGE_ROUTES.PRODUCTS,
  children: [
    { element: <Navigate to={PAGE_ROUTES.PRODUCTS_PRODUCTS} />, index: true },
    {
      path: PAGE_ROUTES.PRODUCTS_PRODUCTS,
      children: [
        { element: <Products />, index: true },
        { path: PAGE_ROUTES.ADD_PRODUCTS, element: <AddProduct /> },
        { path: PAGE_ROUTES.EDIT_PRODUCTS, element: <EditProduct /> },
      ],
    },
    {
      path: PAGE_ROUTES.PRODUCT_CATEGORIES,
      children: [
        { element: <ProductCategories />, index: true },
        { path: PAGE_ROUTES.ADD_PRODUCT_CATEGORIES, element: <AddProductCategory /> },
        { path: PAGE_ROUTES.EDIT_PRODUCT_CATEGORIES, element: <EditProductCategory /> },
      ],
    },
    {
      path: PAGE_ROUTES.MENU_CATEGORIES,
      children: [
        { element: <MenuCategories />, index: true },
        { path: PAGE_ROUTES.ADD_MENU_CATEGORY, element: <AddMenuCategory /> },
        { path: PAGE_ROUTES.EDIT_MENU_CATEGORY, element: <EditMenuCategory /> },
      ],
    },
    {
      path: PAGE_ROUTES.ATTRIBUTE_CATEGORIES,
      children: [
        { element: <AttributeCategories />, index: true },
        { path: PAGE_ROUTES.ADD_ATTRIBUTE_CATEGORIES, element: <AddAttributeCategory /> },
        { path: PAGE_ROUTES.EDIT_ATTRIBUTE_CATEGORIES, element: <EditAttributeCategory /> },
      ],
    },
    {
      path: PAGE_ROUTES.ATTRIBUTES,
      children: [
        { element: <Attributes />, index: true },
        { path: PAGE_ROUTES.ADD_ATTRIBUTE, element: <AddAttribute /> },
        { path: PAGE_ROUTES.EDIT_ATTRIBUTE, element: <EditAttribute /> },
      ],
    },
    { path: PAGE_ROUTES.MAILING_SERVICE_FEES, element: <MailingServiceFees /> },
    { path: PAGE_ROUTES.IMPORT_PRODUCT_PRICING, element: <ImportProductPricing /> },
    {
      path: PAGE_ROUTES.TEMPLATES,
      children: [
        { element: <Templates />, index: true },
        { path: PAGE_ROUTES.ADD_TEMPLATE, element: <AddTemplate /> },
        { path: PAGE_ROUTES.EDIT_TEMPLATE, element: <EditTemplate /> },
      ],
    },
    {
      path: PAGE_ROUTES.TEMPLATE_CATEGORIES,
      children: [
        { element: <TemplateCategories />, index: true },
        { path: PAGE_ROUTES.ADD_TEMPLATE_CATEGORY, element: <AddTemplateCategory /> },
        { path: PAGE_ROUTES.EDIT_TEMPLATE_CATEGORY, element: <EditTemplateCategory /> },
      ],
    },
  ],
};

export default ProductsRoutes;
