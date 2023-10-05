import { IProductsAttribues } from '@features/products/productsAttributes/types';
import * as yup from 'yup';

export interface IAttribute {
  id: string;
  name: string;
  isSelected?: boolean;
}

export interface IAssignedAttributes {
  id: string;
  name: string;
  attributes: IAttribute[];
}
export interface IAddDataForm {
  attributesList: IAssignedAttributes[];
}

export const AddDataSchema = yup.object().shape({

});
export const formattingPayload = (data: IAddDataForm) => {
  const selectedAttributeIds = data.attributesList
    .map((category) =>
      category.attributes
        .filter((attribute) => attribute.isSelected)
        .map((attribute) => attribute.id))
    .flat();

  return { attributes: selectedAttributeIds };
};

export const addingIsSelectedFlag = (
  attributeCategories: IAssignedAttributes[],
  attributes: IProductsAttribues['attributes'],
) => (
  attributeCategories.map((item) => ({
    ...item,
    attributes: item.attributes.map((attr) => {
      return {
        ...attr,
        isSelected: attributes.includes(attr.id),
      };
    }),
  })));
