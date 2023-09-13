import { GrandFormatOptions } from '@features/products/types';
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

export const AddDataSchema = yup.object().shape({
  name: yup.string().required('Product name is required'),
  productSKU: yup.string().required('Product SKU is required'),
  subCategoryId: yup.string().required('Subcategory is required'),
  categoryId: yup.string().required('Category is required'),
  grandFormatOptions: yup.object({
    unitDisplay: yup.string().required('Unit display is required'),
    widthFrom: yup.string().required('Width from is required'),
    widthTo: yup.string().required('Width to is required'),
    heightFrom: yup.string().required('Height from is required'),
    heightTo: yup.string().required('Height to is required'),
    maxHeight: yup.string().required('Max height is required'),
    maxWidth: yup.string().required('Max width is required'),
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
  {
    label: 'Product Weight (1)',
    field: 'weight',
    type: InputTypes.text,
  },
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
];
export const inputsRows2: ValidFieldNames[] = [
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
