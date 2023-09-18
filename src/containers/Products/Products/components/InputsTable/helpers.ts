import { GrandFormatOptions } from '@features/products/types';
import { isIntagerRegex, isNumberRegex } from '@utils/regexp';
import { intagerValidation } from '@utils/schemas';
import { InputTypes, ValidFieldNames } from '@utils/types';
import * as yup from 'yup';

export interface IAddDataForm {
  id?: string;
  name: string;
  description?: string;
  productSKU: string;
  subCategoryId: string;
  categoryId?: string;
  weight?: number | string | null;
  visibleOnSite?: boolean;
  showInSpotlight?: boolean;
  isDiscountable?: boolean;
  quarterhouseProductCode?: string;
  fouroverProdCode?: string;
  fouroverTurnaroundCode?: string;
  grandFormatOptions: GrandFormatOptions | null;
  isGrandFormat?: boolean;
}

export const defaultValues = {
  name: '',
  description: '',
  productSKU: '',
  categoryId: '',
  subCategoryId: '',
  weight: null,
  visibleOnSite: false,
  showInSpotlight: false,
  isDiscountable: false,
  quarterhouseProductCode: '',
  fouroverProdCode: '',
  fouroverTurnaroundCode: '',
  isGrandFormat: false,
  grandFormatOptions: null,
};

export const defaultGrandFormatValues = {
  unitDisplay: '',
  widthFrom: '',
  widthTo: '',
  heightFrom: '',
  heightTo: '',
  maxHeight: '',
  maxWidth: '',
  grandFormatDiscounts: [
    {
      quantity: null,
      discountPercent: null,
    },
  ],
};

export const AddDataSchema = yup.object().shape({
  name: yup.string().required('Product name is required'),
  productSKU: yup.string().required('Product SKU is required'),
  subCategoryId: yup.string().required('Subcategory is required'),
  categoryId: yup.string().required('Category is required'),
  weight: intagerValidation.nullable(),
  grandFormatOptions: yup.object({
    unitDisplay: yup.string().required('Unit display is required'),
    widthFrom: yup.string().required('Width from is required')
      .matches(isNumberRegex, 'Number is invalid'),
    widthTo: yup.string().required('Width to is required')
      .matches(isNumberRegex, 'Number is invalid'),
    heightFrom: yup.string().required('Height from is required')
      .matches(isNumberRegex, 'Number is invalid'),
    heightTo: yup.string().required('Height to is required')
      .matches(isNumberRegex, 'Number is invalid'),
    maxHeight: yup.string().required('Max height is required')
      .matches(isNumberRegex, 'Number is invalid'),
    maxWidth: yup.string().required('Max width is required')
      .matches(isNumberRegex, 'Number is invalid'),
    grandFormatDiscounts: yup.array().of(
      yup.object({
        quantity: yup.string().required('Quantity is required')
          .matches(isIntagerRegex, 'Intager is invalid'),
        discountPercent: yup.string().required('Discount Percent is required')
          .matches(isNumberRegex, 'Number is invalid'),
      }),
    ),
  }).nullable(),
});

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
    label: 'Show In Spotlight',
    field: 'showInSpotlight',
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
  {
    label: '4over Turnaround Code',
    field: 'fouroverTurnaroundCode',
    type: InputTypes.text,
  },
];

export const formattingPayload = (data: IAddDataForm) => {
  const { weight } = data;

  return { ...data, weight: weight ? +weight : null };
};

export const tabsOptions = [
  {
    option: 'basicInfo',
    label: 'Basic Info',
  },
  {
    option: 'productQuantities',
    label: 'Product Quantities',
  },
  {
    option: 'addAttributes',
    label: 'Add Attributes',
  },
  {
    option: 'setPrices',
    label: 'Set prices',
  },
];
