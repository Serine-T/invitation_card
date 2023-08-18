import { InputTypes, ValidFieldNames } from '@utils/types';
import * as yup from 'yup';

export interface IAddBannerForm {
  title: string;
  description: string;
  buttonName: string;
  buttonLink: string;
  image: string;
}

export const defaultValues = {
  title: '',
  description: '',
  buttonName: '',
  buttonLink: '',
  image: '',
};

export const AddBannerSchema = yup.object().shape({
  image: yup.string().required('Username is required'),
  title: yup.string().required('Username is required'),
  description: yup.string().required('Username is required'),
  buttonName: yup.string().required('Username is required'),
  buttonLink: yup.string().required('Username is required'),
});

export const inputsRows: ValidFieldNames[] = [
  {
    label: 'Title',
    field: 'title',
    type: InputTypes.text,
  },
  {
    label: 'Title',
    field: 'title',
    type: InputTypes.textarea,
  },
  {
    label: 'Title',
    field: 'title',
    type: InputTypes.textarea,
  },
];
