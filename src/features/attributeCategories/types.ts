import { Attribute } from '@features/attributes/types';

export interface IState {
  isLoading: boolean;
  actionLoading: boolean;
  data: IAttributeCategory[];
  errorMessage: string | null;
}

export interface IAddAttributeCategoryPayload {
  id?: string;
  name: string;
  description: string;
}

export interface IAttributeCategory {
  id: string;
  created: string;
  updated: string;
  deleted: string;
  name: string;
  description: string;
  sort: number;
  attributes: Attribute[];
}

export interface ISearchAttributeCategories {
  searchTerm?: string;
}
