export interface IState {
  isLoading: boolean;
  data: IProductsSetPrice[];
  actionLoading: boolean;
  errorMessage: null | string;
}

export interface IProductsSetPrice {
  id: string;
  quantity: number;
  basePrice: number;
  quantityInk: QuantityInk[];
  quantityAttributes: any[];
}

export interface IProductsSetPricePayload {
  data: IProductsSetPrice[];
}

export interface QuantityInk {
  id: string;
  price: number;
  ink: Ink;
  quantityInkTurnAround: QuantityInkTurnAround[];
}

export interface Ink {
  name: string;
}

export interface QuantityInkTurnAround {
  id: string;
  price: number;
  turnAround: TurnAround;
}

export interface TurnAround {
  name: string;
}
