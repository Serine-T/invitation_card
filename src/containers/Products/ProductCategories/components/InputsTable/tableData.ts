import { InputTypes, ValidFieldNames } from '@utils/types';

export const inputsRows1: ValidFieldNames[] = [
  {
    label: 'Category',
    field: 'categoryId',
    type: InputTypes.select,
    isRequired: true,
  },
  {
    label: 'Print Type',
    field: 'printType',
    type: InputTypes.select,
    isRequired: true,
  },
  {
    label: 'Use Grand Format SQ. Ft. Template',
    field: 'useGrandFormatSQFtTemplate',
    type: InputTypes.checkbox,
  },
  {
    label: 'Mark as New',
    field: 'isNew',
    type: InputTypes.checkbox,
  },
  {
    label: 'Mark as Sale',
    field: 'isSale',
    type: InputTypes.checkbox,
  },
  {
    label: 'Show In Spotlight',
    field: 'showInSpotlight',
    type: InputTypes.checkbox,
  },
  {
    label: 'Category Discount off MSRP(%)',
    field: 'categoryDiscountOffMSRP',
    type: InputTypes.text,
  },
  {
    label: 'Default Ink in Estimator',
    field: 'defaultInkInEstimator',
    type: InputTypes.select,
  },
];
export const inputsRows2: ValidFieldNames[] = [
  {
    label: 'Photo',
    field: 'photo',
    type: InputTypes.image,
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
    label: 'Visible On Site',
    field: 'visibleOnSite',
    type: InputTypes.checkbox,
  },
  {
    label: 'Display as Card in Header',
    field: 'displayAsCardInHeader',
    type: InputTypes.checkbox,
  },
];
