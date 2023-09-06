import { isNumberRegex } from '@utils/regexp';
import { InputTypes, ValidFieldNames } from '@utils/types';
import * as yup from 'yup';

export interface IAddDataForm {
  id?: string;
  name: string;
  attributeCategory: string;
  nickname: string;
  showInCustomEstimates?: boolean;
  defaultPrice: string;
  fouroverCode: string;
}

export const defaultValues = {
  name: '',
  attributeCategory: '',
  nickname: '',
  showInCustomEstimates: false,
  defaultPrice: '',
  fouroverCode: '',
};

export const AddDataSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  attributeCategory: yup.string().required('Attribute category is required'),
  nickname: yup.string().required('Attribute nickname is required'),
  defaultPrice: yup.string().required('Default price is required').matches(
    isNumberRegex,
    'Number is invalid',
  ),
  fouroverCode: yup.string().required('Fourover code nickname is required'),
});

export const inputsRows: ValidFieldNames[] = [
  {
    label: 'Attribute Category',
    field: 'attributeCategory',
    type: InputTypes.select,
  },
  {
    label: 'Name',
    field: 'name',
    type: InputTypes.text,
  },
  {
    label: 'Attribute Nickname(used internally only)',
    field: 'nickname',
    type: InputTypes.text,
  },
  {
    label: 'Show in Custom Estimates',
    field: 'showInCustomEstimates',
    type: InputTypes.checkbox,
  },
];

export const formattedPayload = (data: IAddDataForm) => {
  const payload = { ...data, defaultPrice: +data.defaultPrice };

  return payload;
};
