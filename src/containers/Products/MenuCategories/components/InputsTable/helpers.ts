import { InputTypes, ValidFieldNames } from '@utils/types';
import * as yup from 'yup';

export interface IAddBannerForm {
  title: string;
  description: string;
  displayInHeader?: boolean;
}

export const defaultValues = {
  title: '',
  description: '',
  displayInHeader: false,
};

export const AddBannerSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
});

export const inputsRows: ValidFieldNames[] = [
  {
    label: 'Title',
    field: 'title',
    type: InputTypes.text,
  },
  {
    label: 'Description',
    field: 'description',
    type: InputTypes.textarea,
  },
  {
    label: 'Display in Header',
    field: 'displayInHeader',
    type: InputTypes.checkbox,
  },
];