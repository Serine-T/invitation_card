import { InputTypes, ValidFieldNames } from '@utils/types';
import * as yup from 'yup';

import { StaticShippingFacility } from './StaticShipping/helpers';

export enum PrintType {
  OFFSET_PRODUCTS = 'offset_products',
  GRAND_FORMAT_PRODUCTS = 'grand_format_products',
  PROMO_PRODUCTS = 'promo_products',
}
export interface IAddSubcategoryForm {
  title: string;
  description: string;
  photo: string;
  categoryId: string;
  printType: PrintType;
  displayInCategory?: boolean;
  displayAsCardInHeader?: boolean;
  staticShippingFacilityAll?: boolean;
  staticShippingFacility?: {
    [StaticShippingFacility.ARIZONA]: boolean;
    [StaticShippingFacility.CALIFORNIA]: boolean;
    [StaticShippingFacility.FLORIDA]: boolean;
    [StaticShippingFacility.MICHIGAN]: boolean;
    [StaticShippingFacility.NEW_JERSEY]: boolean;
    [StaticShippingFacility.NEW_YORK]: boolean;
    [StaticShippingFacility.NORTH_CAROLINA]: boolean;
    [StaticShippingFacility.OHIO]: boolean;
    [StaticShippingFacility.TEXAS]: boolean;
    [StaticShippingFacility.UPSTATE_NEW_YORK]: boolean;
    [StaticShippingFacility.WISCONSIN]: boolean;
  };
}

export const defaultValues = {
  title: '',
  description: '',
  photo: '',
  categoryId: '',
  printType: PrintType.OFFSET_PRODUCTS,
  displayInCategory: false,
  displayAsCardInHeader: false,
  staticShippingFacilityAll: false,
  staticShippingFacility: {
    [StaticShippingFacility.ARIZONA]: false,
    [StaticShippingFacility.CALIFORNIA]: false,
    [StaticShippingFacility.FLORIDA]: false,
    [StaticShippingFacility.MICHIGAN]: false,
    [StaticShippingFacility.NEW_JERSEY]: false,
    [StaticShippingFacility.NEW_YORK]: false,
    [StaticShippingFacility.NORTH_CAROLINA]: false,
    [StaticShippingFacility.OHIO]: false,
    [StaticShippingFacility.TEXAS]: false,
    [StaticShippingFacility.UPSTATE_NEW_YORK]: false,
    [StaticShippingFacility.WISCONSIN]: false,
  },
};

export const AddSubcategorySchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
  photo: yup.string().required('Photo is required'),
  categoryId: yup.string().required('Category is required'),
  printType: yup.string()
    .oneOf(Object.values(PrintType), 'Print type is invalid')
    .required('Print type is required'),
});

export const inputsRows1: ValidFieldNames[] = [
  {
    label: 'Category',
    field: 'categoryId',
    type: InputTypes.select,
    isRequired: true,
  },
  {
    label: 'Print type',
    field: 'printType',
    type: InputTypes.select,
    isRequired: true,
  },
  {
    label: 'Use Grand Format SQ. Ft. Template',
    field: 'useGrandFormatSQFtTemplate',
    type: InputTypes.checkbox,
  },
  {
    label: 'Mark as new',
    field: 'isNew',
    type: InputTypes.checkbox,
  },
  {
    label: 'Mark as sale',
    field: 'isSale',
    type: InputTypes.checkbox,
  },
  {
    label: 'Category Discount off MSRP',
    field: 'categoryDiscountOffMSRP',
    type: InputTypes.text,
  },
  {
    label: 'Default Ink in Estimator',
    field: 'defaultInkInEstimator',
    type: InputTypes.text,
  },
];
export const inputsRows2: ValidFieldNames[] = [
  {
    label: 'Photo',
    field: 'photo',
    type: InputTypes.image,
    isRequired: true,
  },
  {
    label: 'Title',
    field: 'title',
    type: InputTypes.text,
    isRequired: true,
  },
  {
    label: 'Description',
    field: 'description',
    type: InputTypes.textarea,
    isRequired: true,
  },
  {
    label: 'Visible On Site',
    field: 'displayInCategory',
    type: InputTypes.checkbox,
  },
  {
    label: 'Display as Card in Header',
    field: 'displayAsCardInHeader',
    type: InputTypes.checkbox,
  },
];

export const printTypeValues = [
  {
    value: PrintType.OFFSET_PRODUCTS,
    optionName: 'Offset production',
  },
  {
    value: PrintType.GRAND_FORMAT_PRODUCTS,
    optionName: 'Grand format products',
  },
  {
    value: PrintType.PROMO_PRODUCTS,
    optionName: 'Promo Products',
  },
];
