export interface IState {
  isLoading: boolean;
  data: IProductsAttribues['attributes'];
  actionLoading: boolean;
  errorMessage: null | string;
}

export interface IProductsAttribues {
  attributes: string[];
}
