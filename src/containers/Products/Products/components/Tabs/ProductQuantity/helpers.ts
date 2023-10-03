import { GrandFormatOptions } from '@features/products/basicInfo/types';
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

export const formattingPayload = (data: IAddDataForm) => {
  const { weight } = data;

  return { ...data, weight: weight ? +weight : null };
};
