import { InputTypes, ValidFieldNames } from '@utils/types';
import * as yup from 'yup';

export interface IAddDataForm {
  name: string;
}

export const defaultValues = {
  name: '',
};

export const AddDataSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
});

export const inputsRows: ValidFieldNames[] = [
  {
    label: 'Template Name',
    field: 'name',
    type: InputTypes.text,
  },
];
