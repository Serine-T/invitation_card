import { numberValidation } from '@utils/schemas';
import { InputTypes, ValidFieldNames } from '@utils/types';
import * as yup from 'yup';

export interface IAddDataForm {
  id?: string;
  name: string;
  attributeCategory: string;
  nickname: string;
  showInCustomEstimates?: boolean;
  defaultPrice: string | null;
  fouroverCode?: string;
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
  defaultPrice: numberValidation.nullable(),
});

export const inputsRows: ValidFieldNames[] = [
  {
    label: 'Attribute Category',
    field: 'attributeCategory',
    type: InputTypes.select,
    isRequired: true,
  },
  {
    label: 'Name',
    field: 'name',
    type: InputTypes.text,
    isRequired: true,
  },
  {
    label: 'Attribute Nickname(used internally only)',
    field: 'nickname',
    type: InputTypes.text,
    isRequired: true,
  },
  {
    label: 'Show in Custom Estimates',
    field: 'showInCustomEstimates',
    type: InputTypes.checkbox,
    isRequired: false,
  },
];

export const formattedPayload = (data: IAddDataForm) => {
  const payload = { ...data, defaultPrice: data.defaultPrice ? data.defaultPrice : null };

  return payload;
};
