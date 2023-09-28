export interface IState {
  isLoading: boolean;
  data: IProductsQuantityInfo[];
  actionLoading: boolean;
  errorMessage: null | string;
}

export interface IProductsQuantityInfo {
  id?: string;
}

export interface IProductsQuantityPayload {
  id?: string;
  quantity: number | null;
  productId: string;
}
