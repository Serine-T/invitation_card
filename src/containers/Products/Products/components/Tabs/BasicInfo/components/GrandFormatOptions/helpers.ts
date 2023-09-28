import { intagerSchema, positiveNumberSchema } from '@utils/schemas';
import * as yup from 'yup';

export const unitDisplayList = [
  { value: 'ft',
    optionName: 'Foot',
  },
  { value: 'in',
    optionName: 'Inch',
  },
];

export const valCases = {
  isGreaterThanWidth: 'Width from is greater than Width to',
  isGreaterThanHeight: 'Height from is greater than Height to',
};

const grandFormatDiscountsSchema = yup.object({
  quantity: intagerSchema.required('Quantity is required'),
  discountPercent: positiveNumberSchema.required('Discount percent is required'),
});

export const GrandFormatOptionsSchema = yup.object({
  unitDisplay: yup.string().required('Unit display is required'),
  widthFrom: positiveNumberSchema.required('Width from is required'),
  widthTo: positiveNumberSchema.required('Width to is required'),
  heightFrom: positiveNumberSchema.required('Height from is required'),
  heightTo: positiveNumberSchema.required('Height to is required'),
  maxHeight: positiveNumberSchema.required('Max height is required'),
  maxWidth: positiveNumberSchema.required('Max width is required'),
  grandFormatDiscounts: yup.array().of(grandFormatDiscountsSchema),
}).nullable();
