export interface IState {
  isLoading: boolean;
  actionLoading: boolean;
  data: ICategories[];
}

export interface IAddCategoryPayload {
  id?: string;
  title: string;
  description: string;
  displayInHeader?: boolean;
}

export interface ICategories {
  id: string;
  created: string;
  updated: string;
  deleted: string;
  title: string;
  description: string;
  sort: number;
  displayInHeader: boolean;
}
