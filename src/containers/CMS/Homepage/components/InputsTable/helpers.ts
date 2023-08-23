import { BannerCategoryEnum } from '@features/banners/types';
import { InputTypes, ValidFieldNames } from '@utils/types';
import * as yup from 'yup';

export interface IAddBannerForm {
  id?: string;
  title: string;
  description: string;
  desktopPhoto: string;
  mobilePhoto: string;
  backgroundColor: string;
  firstButtonName: string;
  firstButtonLink: string;
  secondButtonName: string;
  secondButtonLink: string;
  category?: BannerCategoryEnum;
  displayOnSite?: boolean;
}

export const defaultValues = {
  title: '',
  description: '',
  desktopPhoto: '',
  mobilePhoto: '',
  backgroundColor: '',
  firstButtonName: '',
  firstButtonLink: '',
  secondButtonName: '',
  secondButtonLink: '',
  category: BannerCategoryEnum.slider,
  displayOnSite: false,
};

export const AddBannerSchema = yup.object().shape({
  desktopPhoto: yup.string().required('Desktop photo is required'),
  mobilePhoto: yup.string().required('Moblie photo  is required'),
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
  backgroundColor: yup.string().required('Background color is required'),
  firstButtonName: yup.string().required('First button name is required'),
  firstButtonLink: yup.string().url('URL is invalid').required('First button link is required'),
  secondButtonName: yup.string().required('Second button name is required'),
  secondButtonLink: yup.string().url('URL is invalid').required('Second button link is required'),
});

export const inputsRows: ValidFieldNames[] = [
  {
    label: 'Photo (Desktop)',
    field: 'desktopPhoto',
    type: InputTypes.image,
  },
  {
    label: 'Photo (Mobile)',
    field: 'mobilePhoto',
    type: InputTypes.image,
  },
  {
    label: 'Category',
    field: 'category',
    type: InputTypes.select,
  },
  {
    label: 'Background color (HEX)',
    field: 'backgroundColor',
    type: InputTypes.colorPicker,
  },
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
    label: 'Button Name',
    field: 'firstButtonName',
    type: InputTypes.text,
  },
  {
    label: 'Button Link',
    field: 'firstButtonLink',
    type: InputTypes.text,
  },
  {
    label: 'Button Name 2',
    field: 'secondButtonName',
    type: InputTypes.text,
  },
  {
    label: 'Button Link 2',
    field: 'secondButtonLink',
    type: InputTypes.text,
  },
  {
    label: 'Visible on Site',
    field: 'displayOnSite',
    type: InputTypes.checkbox,
  },
];
