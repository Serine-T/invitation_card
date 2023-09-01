export interface IState {
  isLoading: boolean;
  actionLoading: boolean;
  data: IAttributeCategories[];
  errorMessage: string | null;
}

export interface IAddAttributeCategoryPayload {
  id?: string;
  title: string;
  description: string;
  displayInHeader?: boolean;
}

export interface IAttributeCategories {
  id: string;
  created: string;
  updated: string;
  deleted: string;
  title: string;
  description: string;
  sort: number;
  displayInHeader: boolean;
}

export interface ISearchCategories {
  searchTerm?: string;
  displayInHeader?: string;
}
