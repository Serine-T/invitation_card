export interface IState {
  isLoading: boolean;
  actionLoading: boolean;
  data: IAttribute[];
  errorMessage: string | null;
}

export interface IAddAttributePayload {
  id?: string;
  title: string;
  description: string;
  displayInHeader?: boolean;
}

export interface IAttribute {
  id: string;
  created: string;
  updated: string;
  deleted: string;
  title: string;
  description: string;
  sort: number;
  displayInHeader: boolean;
}

export interface ISearchAttributes {
  searchTerm?: string;
  displayInHeader?: string;
}
