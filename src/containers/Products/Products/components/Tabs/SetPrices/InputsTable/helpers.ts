import { IProductsSetPrice } from '@features/products/setPrice/types';
import { InputTypes, ValidFieldNames } from '@utils/types';
import * as yup from 'yup';

export interface IAddDataForm {
  productsPrices: IProductsSetPrice[];
}

export const AddDataSchema = yup.object().shape({

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
  const updatedData = data.productsPrices.map((item) => {
    return {
      ...item,
      basePrice: Number(item.basePrice),

      quantityInk: item.quantityInk.map((inkItem) => {
        return {
          ...inkItem,
          price: Number(inkItem.price),
          quantityInkTurnAround: inkItem.quantityInkTurnAround.map((turnAroundItem) => ({
            ...turnAroundItem,
            price: Number(turnAroundItem.price),
          })),
        };
      }),

      quantityAttributes: item.quantityAttributes.flatMap((attributeGroup) => {
        return attributeGroup.attributes.map((attr: any) => ({
          ...attr,
          price: Number(attr.price),
          attribute: { name: attr.name },
        }));
      }),
    };
  });

  return { data: updatedData };
};
