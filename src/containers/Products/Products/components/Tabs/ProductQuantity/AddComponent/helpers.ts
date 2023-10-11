import { integerSchema, positiveNumberSchema } from '@utils/schemas';
import * as yup from 'yup';

export interface IAddDataForm {
  id?: string;
  quantity: number | null;
  productId: string;
  basePrice: number | null;
}

export const defaultValues = {
  quantity: null,
  productId: null,
  basePrice: null,
};

export const AddDataSchema = yup.object().shape({
  quantity: integerSchema.required('Quantity is required'),
  basePrice: positiveNumberSchema.required('Base price is required'),
});

export const formattingPayload = (data: IAddDataForm) => {
  return { ...data };
};
