import { InputTypes, ValidFieldNames } from '@utils/types';
import * as yup from 'yup';

export interface IAddBestSellerForm {
  id?: string;
  title: string;
  description: string;
  desktopPhoto: string;
  mobilePhoto: string;
  displayOnSite: boolean;
  subCategory: string;
}

export const defaultValues = {
  id: '',
  title: '',
  description: '',
  desktopPhoto: '',
  mobilePhoto: '',
  displayOnSite: false,
  subCategory: '',
};

export const AddBestSellerSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
  desktopPhoto: yup.string().required('Desktop photo is required'),
  mobilePhoto: yup.string().required('Mobile photo is required'),
  displayOnSite: yup.boolean().defined(),
  subCategory: yup.string().required('Subcategory is required'),
});

export const inputsRows: ValidFieldNames[] = [
  {
    label: 'Photo (Desktop)',
    field: 'desktopPhoto',
    type: InputTypes.image,
    isRequired: true,
  },
  {
    label: 'Photo (Mobile)',
    field: 'mobilePhoto',
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
    label: 'Subcategory',
    field: 'subCategory',
    type: InputTypes.select,
    isRequired: true,
  },
  {
    label: 'Product',
    field: 'product',
    type: InputTypes.select,
  },
  {
    label: 'Description',
    field: 'description',
    type: InputTypes.textarea,
    isRequired: true,
  },
  {
    label: 'Visible in category',
    field: 'displayOnSite',
    type: InputTypes.checkbox,
  },
];
