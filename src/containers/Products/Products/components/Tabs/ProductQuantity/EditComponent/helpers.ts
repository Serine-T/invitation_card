import { IProductsQuantityPayload } from '@features/products/productsQuantity/types';
import { numberValidation } from '@utils/schemas';
import * as yup from 'yup';

export interface IAddDataForm {
  quantities: IProductsQuantityPayload[];
}

export const AddDataSchema = yup.object().shape({
  quantities: yup.array().of(
    yup.object({
      basePrice: numberValidation.required('Base price is required'),
    }),
  ),
});

export const formattingPayload = ({ quantities }: IAddDataForm) => {
  const payload = quantities.map((item) => ({
    ...item, basePrice: item.basePrice ? +item.basePrice : 0,
  }));

  return { quantities: payload };
};
