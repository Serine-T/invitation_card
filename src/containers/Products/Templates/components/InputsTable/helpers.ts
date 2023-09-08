import { InputTypes, ValidFieldNames } from '@utils/types';
import * as yup from 'yup';

export interface IAddDataForm {
  id?: string;
  name: string;
  photo: string;
  subCategoryId:string;
  templateCategoryId?:string;
}

export const defaultValues = {
  name: '',
  photo: '',
  subCategoryId: '',
  templateCategoryId: '',
};

export const AddDataSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  subCategoryId: yup.string().required('Subcategory is required'),
  photo: yup.string().required('Photo is required'),
});

export const inputsRows: ValidFieldNames[] = [
  {
    label: 'Subcategory',
    field: 'subCategoryId',
    type: InputTypes.select,
    isRequired: true,
  },
  {
    label: 'Template Category',
    field: 'templateCategoryId',
    type: InputTypes.select,
    isRequired: false,
  },
  {
    label: 'Template Name',
    field: 'name',
    type: InputTypes.text,
    isRequired: true,
  },
  {
    label: 'File',
    field: 'photo',
    type: InputTypes.image,
    isRequired: true,
  },
];

export const formattedPayload = (data: IAddDataForm) => ({
  ...data, templateCategoryId: data.templateCategoryId || null,
});
