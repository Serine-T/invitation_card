export interface IState {
  isLoading: boolean;
  actionLoading: boolean;
  data: IAttribute[];
  errorMessage: string | null;
}

export interface IAddAttributePayload {
  id?: string;
  name: string;
  attributeCategory: string;
  nickname: string;
  showInCustomEstimates?: boolean;
  defaultPrice?: number | null;
  fouroverCode?: string;
}
export interface Attribute {
  id: string;
  created: string;
  updated: string;
  deleted: any;
  name: string;
  nickname: string;
  showInCustomEstimates: boolean;
  defaultPrice: number;
  fouroverCode: string;
  sort: number;
  attributeCategory: string;
}

export interface IAttribute {
  id: string;
  created: string;
  updated: string;
  deleted: any;
  name: string;
  description: string;
  sort: number;
  attributes: Attribute[];
}

export interface ISearchAttributes {
  searchTerm?: string;
}
