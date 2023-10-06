import AddAttributes from './AddAttributes';
import BasicInfo from './BasicInfo';
import ProductQuantity from './ProductQuantity';
import SetPrices from './SetPrices';

export const tabsOptions = [
  {
    component: SetPrices,
    label: 'Set prices',
  },
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

];
