import { InputTypes, ValidFieldNames } from '@utils/types';
import * as yup from 'yup';

export interface IAddDataForm {
  name: string;
  description: string;
}

export const defaultValues = {
  name: '',
  description: '',
};

export const AddDataSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  description: yup.string().required('Description is required').max(500, 'The maximum length is 500 characters'),
});

export const inputsRows: ValidFieldNames[] = [
  {
    label: 'Name',
    field: 'name',
    type: InputTypes.text,
  },
  {
    label: 'Description',
    field: 'description',
    type: InputTypes.textarea,
  },
];
