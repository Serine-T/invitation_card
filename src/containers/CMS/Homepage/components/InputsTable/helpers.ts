import { BannerCategoryEnum } from '@features/banners/types';
import { isHexCodeRegex } from '@utils/regexp';
import { validateOptionalURL } from '@utils/schemas';
import { InputTypes, ValidFieldNames } from '@utils/types';
import * as yup from 'yup';

export interface IAddBannerForm {
  id?: string;
  title: string;
  description: string;
  desktopPhoto: string;
  mobilePhoto: string;
  backgroundColor: string;
  firstButtonName?: string;
  firstButtonLink: string;
  secondButtonName?: string;
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
  description: yup.string().required('Description is required').max(500, 'The maximum length is 500 characters'),
  backgroundColor: yup.string().required('Background color is required').matches(
    isHexCodeRegex,
    'HEX code is invalid',
  ),
  firstButtonLink: validateOptionalURL,
  secondButtonLink: validateOptionalURL,
});

export const inputsRows: ValidFieldNames[] = [
  {
    label: 'Photo (Desktop)',
    field: 'desktopPhoto',
    type: InputTypes.image,
    isRequired: true,
  },
  {
    label: 'Photo (Mobile)',
    field: 'mobilePhoto',
    type: InputTypes.image,
    isRequired: true,
  },
  {
    label: 'Category',
    field: 'category',
    type: InputTypes.select,
    isRequired: true,
  },
  {
    label: 'Background color (HEX)',
    field: 'backgroundColor',
    type: InputTypes.colorPicker,
    isRequired: true,
  },
  {
    label: 'Title',
    field: 'title',
    type: InputTypes.text,
    isRequired: true,
  },
  {
    label: 'Description',
    field: 'description',
    type: InputTypes.textarea,
    isRequired: true,
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

export const bannersTypeList = [
  {
    optionName: 'Banner',
    value: BannerCategoryEnum.banner,
  },
  {
    optionName: 'Slider',
    value: BannerCategoryEnum.slider,
  },
];
