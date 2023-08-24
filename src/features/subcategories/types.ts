export interface IState {
  isLoading: boolean;
  data:null | ISubcategoriesInfo[];
  actionLoading: boolean;
  errorMessage: null | string;
}

export interface IAddSubcategoriesPayload {
  id?: string;
}

export interface ISubcategoriesInfo {

}
