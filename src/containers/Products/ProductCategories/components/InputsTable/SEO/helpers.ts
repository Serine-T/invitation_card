import { InputTypes, ValidFieldNames } from '@utils/types';

export const seoFields: ValidFieldNames[] = [
  {
    label: 'Meta Tag Title:',
    field: 'metaTagTitle',
    type: InputTypes.text,
  },
  {
    label: 'Meta Tag Description:',
    field: 'metaTagDescription',
    type: InputTypes.text,
  },
  {
    label: 'Meta Tag Keywords:',
    field: 'metaTagKeywords',
    type: InputTypes.textarea,
  },
];
