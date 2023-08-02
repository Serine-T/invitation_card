import * as yup from 'yup';

export interface IAddBannerForm {
  title: string;
  description: string;
  buttonName: string;
  buttonLink: string;
}

export const defaultValues = {
  title: '',
  description: '',
  buttonName: '',
  buttonLink: '',
};

export const AddBannerSchema = yup.object().shape({
  title: yup.string().required('Username is required'),
  description: yup.string().required('Username is required'),
  buttonName: yup.string().required('Username is required'),
  buttonLink: yup.string().required('Username is required'),
});

type ValidFieldNames = {
  label: string;
  field: keyof IAddBannerForm;
}

export const inputsRows: ValidFieldNames[] = [
  {
    label: 'Title',
    field: 'title',
  },
  {
    label: 'Description',
    field: 'description',
  },
  {
    label: 'Button Name',
    field: 'buttonName',
  },
  {
    label: 'Button Link',
    field: 'buttonLink',
  },
];