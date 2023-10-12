import { InputTypes, ValidFieldNames } from '@utils/types';

export const inputsRows1: ValidFieldNames[] = [
  {
    label: 'Category',
    field: 'categoryId',
    type: InputTypes.select,
    isRequired: true,
  },
  {
    label: 'Subcategory',
    field: 'subCategoryId',
    type: InputTypes.select,
    isRequired: true,
  },
  {
    label: 'Product SKU',
    field: 'productSKU',
    type: InputTypes.text,
    isRequired: true,
  },
  {
    label: 'Product Name',
    field: 'name',
    type: InputTypes.text,
    isRequired: true,
  },
];

export const inputsRows2: ValidFieldNames[] = [
  {
    label: 'Visible on Site',
    field: 'visibleOnSite',
    type: InputTypes.checkbox,
  },
  {
    label: 'Can Be Discounted with Promo Codes',
    field: 'isDiscountable',
    type: InputTypes.checkbox,
  },
  {
    label: 'Quarterhouse Product Code',
    field: 'quarterhouseProductCode',
    type: InputTypes.text,
  },
  {
    label: '4over Prod Code',
    field: 'fouroverProdCode',
    type: InputTypes.text,
  },
];
