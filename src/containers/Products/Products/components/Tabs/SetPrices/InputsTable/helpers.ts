import { IProductsSetPrice } from '@features/products/setPrice/types';
import { numberSchema } from '@utils/schemas';
import { InputTypes, ValidFieldNames } from '@utils/types';
import * as yup from 'yup';

export interface IAddDataForm {
  quantities: IProductsSetPrice[];
}

export const AddDataSchema = yup.object().shape({
  quantities: yup.array().of(
    yup.object({
      attributeCategories: yup.array().of(
        yup.object({
          attributes: yup.array().of(
            yup.object({
              price: numberSchema.required('Price is required'),
            }),
          ),
        }),
      ),
    }),
  ),
});

export const inputsRows1: ValidFieldNames[] = [
  {
    label: 'Category',
    field: 'categoryId',
    type: InputTypes.select,
    isRequired: true,
  },
  {
    label: 'Subcategory',
    field: 'subCategoryId',
    type: InputTypes.select,
    isRequired: true,
  },
  {
    label: 'Product SKU',
    field: 'productSKU',
    type: InputTypes.text,
    isRequired: true,
  },
  {
    label: 'Product Name',
    field: 'name',
    type: InputTypes.text,
    isRequired: true,
  },

];

export const formattingPayload = (data: IAddDataForm) => {
  // const updatedData = data.quantities.map((item) => {
  //   return {
  //     ...item,
  //     basePrice: Number(item.basePrice),

  //     quantityInk: item.quantityInk.map((inkItem) => {
  //       return {
  //         ...inkItem,
  //         price: Number(inkItem.price),
  //         quantityInkTurnAround: inkItem.quantityInkTurnAround.map((turnAroundItem) => ({
  //           ...turnAroundItem,
  //           price: Number(turnAroundItem.price),
  //         })),
  //       };
  //     }),

  //     quantityAttributes: item.quantityAttributes.flatMap((attributeGroup) => {
  //       return attributeGroup.attributes.map((attr: any) => ({
  //         ...attr,
  //         price: Number(attr.price),
  //         attribute: { name: attr.name },
  //       }));
  //     }),
  //   };
  // });

  return { quantities: data.quantities };
};
