import { isIntagerRegex, isNumberRegex } from '@utils/regexp';
import { intagerValidation, numberValidation } from '@utils/schemas';
import { InputTypes, ValidFieldNames } from '@utils/types';
import * as yup from 'yup';

export interface GrandFormatDiscount {
  quantity: number | null;
  discountPercent: number | null;
}
export interface GrandFormatOptions {
  unitDisplay: string;
  widthFrom: number| null;
  widthTo: number | null;
  heightFrom: number | null;
  heightTo: number | null;
  maxHeight: number | null;
  maxWidth: number | null;
  grandFormatDiscounts: GrandFormatDiscount[];
}
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
  widthFrom: null,
  widthTo: null,
  heightFrom: null,
  heightTo: null,
  maxHeight: null,
  maxWidth: null,
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
  weight: numberValidation.nullable(),
  grandFormatOptions: yup.object({
    unitDisplay: yup.string().required('Unit display is required'),
    widthFrom: yup.number().typeError('Number is invalid').required('Width from is required')
      .positive('Number is not positive'),
    widthTo: yup.number().typeError('Number is invalid').required('Width to is required')
      .positive('Number is not positive'),
    heightFrom: yup.number().typeError('Number is invalid').required('Height from is required')
      .positive('Number is not positive'),
    heightTo: yup.number().typeError('Number is invalid').required('Height to is required')
      .positive('Number is not positive'),
    maxHeight: yup.number().typeError('Number is invalid').required('Max height is required')
      .positive('Number is not positive'),
    maxWidth: yup.number().typeError('Number is invalid').required('Max width is required')
      .positive('Number is not positive'),
    grandFormatDiscounts: yup.array().of(
      yup.object({
        quantity: yup.string().required('Quantity is required')
          .matches(isIntagerRegex, 'Intager is invalid'),
        discountPercent: yup.string().required('Discount percent is required')
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

export const transformValuesToNumbers = (values: GrandFormatOptions) => {
  const { widthFrom, widthTo, heightFrom, heightTo, maxHeight, maxWidth, grandFormatDiscounts } = values;
  const transformedValues = {
    ...values,
    widthFrom: widthFrom ? +widthFrom : null,
    widthTo: widthTo ? +widthTo : null,
    heightFrom: heightFrom ? +heightFrom : null,
    heightTo: heightTo ? +heightTo : null,
    maxHeight: maxHeight ? +maxHeight : null,
    maxWidth: maxWidth ? +maxWidth : null,
    grandFormatDiscounts: grandFormatDiscounts.map(({ quantity, discountPercent }) => ({
      quantity,
      discountPercent,
    })),
  };

  return transformedValues;
};

export const formattingPayload = (data: IAddDataForm) => {
  const { weight, grandFormatOptions } = data;

  return {
    ...data,
    weight: weight ? +weight : null,
    grandFormatOptions: grandFormatOptions ? transformValuesToNumbers(grandFormatOptions) : null,
  };
};
