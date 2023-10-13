import { IProductsQuantityPayload } from '@features/products/productsQuantity/types';
import { numberSchema } from '@utils/schemas';
import * as yup from 'yup';

export interface IAddDataForm {
  quantities: IProductsQuantityPayload[];
}

export const AddDataSchema = yup.object().shape({
  quantities: yup.array().of(
    yup.object({
      basePrice: numberSchema.required('Base price is required'),
    }),
  ),
});

export const formattingPayload = ({ quantities }: IAddDataForm) => {
  return { quantities };
};
