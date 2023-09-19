import AddAttributes from './AddAttributes';
import BasicInfo from './BasicInfo';
import ProductQuantity from './ProductQuantity';
import SetPrices from './SetPrices';

export const tabsOptions = [
  {
    component: BasicInfo,
    label: 'Basic Info',
  },
  {
    component: ProductQuantity,
    label: 'Product Quantities',
  },
  {
    component: AddAttributes,
    label: 'Add Attributes',
  },
  {
    component: SetPrices,
    label: 'Set prices',
  },
];
