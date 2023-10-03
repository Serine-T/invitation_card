import * as yup from 'yup';

export interface IAddDataForm {
  quantityAttributes: any; // TODO: productQuantity
}

export const AddDataSchema = yup.object().shape({
  // quantity: integerSchema.required('Quantity is required'),
  // basePrice: positiveNumberSchema.required('Base price is required'),
});

export const formattingPayload = (data: IAddDataForm) => {
  console.log('daaatttta', data);

  const { quantityAttributes } = data;

  const newQuantityAttributes = quantityAttributes.map((item: any) => {
    item.attributes = item.attributes.map((attribute: any) => {
      attribute.turnAroundIds = attribute?.turnAroundIds?.map((turnaround: any) => turnaround?.turnAroundId);

      return attribute;
    });

    return item;
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
