import { numberValidation, textWidthValidation } from '@utils/schemas';
import { InputTypes, ValidFieldNames } from '@utils/types';
import * as yup from 'yup';
import { GrandFormatOptions } from '@features/products/types';

import { GrandFormatOptionsSchema } from './GrandFormatOptions/helpers';

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
  grandFormatDiscounts: [{
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
  grandFormatOptions: GrandFormatOptionsSchema,
  metaTagDescription: textWidthValidation,
  metaTagTitle: textWidthValidation,
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
      quantity: quantity ? +quantity : null,
      discountPercent: discountPercent ? +discountPercent : null,
    })),
  };

  return transformedValues;
};

export const formattingPayload = (data: IAddDataForm) => {
  const { weight, grandFormatOptions } = data;
  const payload = {
    ...data,
    weight: weight ? +weight : null,
  };

  if (grandFormatOptions) {
    const grandFormatOptionsData = transformValuesToNumbers(grandFormatOptions);
    const { heightFrom, heightTo, widthFrom, widthTo } = grandFormatOptionsData;

    if ((heightFrom && heightTo && heightFrom > heightTo)
      || (widthFrom && widthTo && widthFrom > widthTo)) {
      return null;
    }

    payload.grandFormatOptions = grandFormatOptionsData;
  }

  return payload;
};
