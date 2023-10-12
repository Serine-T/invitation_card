import { numberValidation, createTextWidthValidation } from '@utils/schemas';
import * as yup from 'yup';
import { GrandFormatOptions } from '@features/products/basicInfo/types';

import { GrandFormatOptionsSchema } from './components/GrandFormatOptions/helpers';

export interface IAddDataForm {
  id?: string;
  name: string;
  description?: string;
  productSKU: string;
  subCategoryId: string;
  categoryId?: string;
  weight?: number | string | null;
  visibleOnSite?: boolean;
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
  metaTagDescription: createTextWidthValidation(250),
  metaTagTitle: createTextWidthValidation(250),
  description: createTextWidthValidation(500),
});

export const transformValuesToNumbers = (values: GrandFormatOptions) => {
  const { widthFrom, widthTo, heightFrom, heightTo, maxHeight, maxWidth, grandFormatDiscounts } = values;

  return {
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
