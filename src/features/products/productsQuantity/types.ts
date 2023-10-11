export interface IState {
  isLoading: boolean;
  data: IProductsQuantityPayload[];
  actionLoading: boolean;
  errorMessage: null | string;
}

export interface IProductsQuantityInfo {
  quantities: IProductsQuantityPayload[];
}

export interface QuantityAttribute {
  quantityId: string;
  attributes: any[]; // TODO: delete it
}

export interface IProductsQuantityPayload {
  id?: string;
  quantity: number | null;
  basePrice: number | null;
}
