export interface IState {
  isLoading: boolean;
  data: QuantityAttribute[];
  actionLoading: boolean;
  errorMessage: null | string;
}

export interface IProductsQuantityInfo {
  quantityAttributes: QuantityAttribute[];
}

export interface QuantityAttribute {
  quantityId: string;
  attributes: Attribute[];
}

export interface TurnAroundId {
  turnAroundId: string;
  id: string;
}
export interface Attribute {
  inkId: string;
  turnAroundIds: string[] | TurnAroundId[];
}

export interface IProductsQuantityPayload {
  id?: string;
  quantity: number | null;
  productId: string;
}
