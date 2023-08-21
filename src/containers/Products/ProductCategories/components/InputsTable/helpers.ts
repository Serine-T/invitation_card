import { InputTypes, ValidFieldNames } from '@utils/types';
import * as yup from 'yup';

export interface IAddBannerForm {
  title: string;
  description: string;
  photo: string;
  categoryId: string;
  printType: string;
  displayInCategory?: boolean;
  displayAsCardInHeader?: boolean;
  isNew?: boolean;
}

export const defaultValues = {
  title: '',
  description: '',
  photo: '',
  categoryId: '',
  printType: '',
  displayInCategory: false,
  displayAsCardInHeader: false,
  isNew: false,
};

export const AddBannerSchema = yup.object().shape({
  title: yup.string().required('Username is required'),
  description: yup.string().required('Username is required'),
  photo: yup.string().required('Username is required'),
  categoryId: yup.string().required('Username is required'),
  printType: yup.string().required('Username is required'),
});

export const inputsRows: ValidFieldNames[] = [
  {
    label: 'Use Grand Format SQ. Ft. Template',
    field: 'category',
    type: InputTypes.checkbox,
  },
  {
    label: 'Mark as new',
    field: 'isNew',
    type: InputTypes.checkbox,
  },
  {
    label: 'Mark as sale',
    field: 'isNew',
    type: InputTypes.checkbox,
  },
];
