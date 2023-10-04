import { IProductsQuantityInfo } from '@features/products/productsQuantity/types';
import * as yup from 'yup';

export interface IAddDataForm extends IProductsQuantityInfo {

}

export const AddDataSchema = yup.object().shape({
  quantityAttributes: yup.array().of(
    yup.object({
      attributes: yup.array().of(yup.object({
        inkId: yup.string().required('Ink is required'),
        turnAroundIds: yup.array().of(
          yup.object({
            turnAroundId: yup.string().required('Turn around is required'),
          }),
        ),
      })),
    }),
  ),
});

export const formattingPayload = (data: IAddDataForm) => {
  const { quantityAttributes } = data;

  const newQuantityAttributes = quantityAttributes.map((item) => {
    return {
      ...item,
      attributes: item.attributes.map((attribute) => {
        return {
          ...attribute,
          turnAroundIds: attribute?.turnAroundIds?.map((turnaround: any) => turnaround?.turnAroundId) || [],
        };
      }),
    };
  });

  return { quantityAttributes: newQuantityAttributes };
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
