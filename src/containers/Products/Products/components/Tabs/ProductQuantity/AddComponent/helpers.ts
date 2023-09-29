import { integerSchema } from '@utils/schemas';
import * as yup from 'yup';

export interface IAddDataForm {
  id?: string;
  quantity: number | null;
  productId: string;
}

export const defaultValues = {
  quantity: null,
  productId: '',
};

export const AddDataSchema = yup.object().shape({
  quantity: integerSchema.required('Quantity is required'),
});

export const formattingPayload = (data: IAddDataForm) => {
  return { ...data };
};
