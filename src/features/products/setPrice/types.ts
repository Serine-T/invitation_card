import { Attribute } from '@features/attributes/types';

export interface IState {
  isLoading: boolean;
  data: IProductsSetPricePayload;
  actionLoading: boolean;
  errorMessage: null | string;
}

export interface IProductsSetPrice {
  id: string;
  quantity: number;
  basePrice: number;
  attributeCategories: AttributeCategory[];
}

export interface IProductsSetPricePayload {
  quantities: IProductsSetPrice[];
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
export interface AttributeCategory {
  name: string;
  attributes: Attribute[];
}
