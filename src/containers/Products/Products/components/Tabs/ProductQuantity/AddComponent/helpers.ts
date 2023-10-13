import { integerSchema, numberSchema } from '@utils/schemas';
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
  quantity: integerSchema.required('Quantity is required').max(9999999, 'Max length is 9 digits'),
  basePrice: numberSchema.required('Base price is required'),
});

export const formattingPayload = (data: IAddDataForm) => {
  return { ...data };
};
