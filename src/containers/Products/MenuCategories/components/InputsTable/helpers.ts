import { InputTypes, ValidFieldNames } from '@utils/types';
import * as yup from 'yup';

export interface IAddDataForm {
  title: string;
  description: string;
  displayInHeader?: boolean;
  visibleOnSite?: boolean;
}

export const defaultValues = {
  title: '',
  description: '',
  displayInHeader: false,
  visibleOnSite: false,
};

export const AddDataSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required').max(500, 'The maximum length is 500 characters'),
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
  {
    label: 'Visible on Site',
    field: 'visibleOnSite',
    type: InputTypes.checkbox,
  },
];
