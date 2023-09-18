import AddAttributes from './TabsContainers/AddAttributes';
import BasicInfo from './TabsContainers/BasicInfo';
import ProductQuantity from './TabsContainers/ProductQuantity';
import SetPrices from './TabsContainers/SetPrices';

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
