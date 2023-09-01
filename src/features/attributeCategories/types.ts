export interface IState {
  isLoading: boolean;
  actionLoading: boolean;
  data: IAttributeCategory[];
  errorMessage: string | null;
}

export interface IAddAttributeCategoryPayload {
  id?: string;
  title: string;
  description: string;
  displayInHeader?: boolean;
}

export interface IAttributeCategory {
  id: string;
  created: string;
  updated: string;
  deleted: string;
  title: string;
  description: string;
  sort: number;
  displayInHeader: boolean;
}

export interface ISearchAttributeCategories {
  searchTerm?: string;
  displayInHeader?: string;
}
