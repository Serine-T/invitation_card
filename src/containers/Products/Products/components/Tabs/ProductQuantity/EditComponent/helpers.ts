import { integerSchema, positiveNumberSchema } from '@utils/schemas';
import * as yup from 'yup';

export interface IAddDataForm {
  id?: string;
  quantity: number | null;
  basePrice: number | null;
  productId: string;
}

export const defaultValues = {
  quantity: null,
  basePrice: null,
  productId: '',
};

export const AddDataSchema = yup.object().shape({
  quantity: integerSchema.required('Quantity is required'),
  basePrice: positiveNumberSchema.required('Base price is required'),
});

export const formattingPayload = (data: IAddDataForm) => {
  return { ...data };
};

export const headCells = [
  {
    label: 'Quantity',
  },
  {
    label: 'Base Price',
  },
  {
    label: 'Actions',
  },
];
