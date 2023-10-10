import { IAddSubcategoriesPayload } from '@features/subcategories/types';

export interface IState {
  isLoading: boolean;
  actionLoading: boolean;
  data: ICategories[];
  errorMessage: string | null;
}

export interface IAddCategoryPayload {
  id?: string;
  title: string;
  description: string;
  displayInHeader?: boolean;
  visibleOnSite?: boolean;
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
  subCategory: IAddSubcategoriesPayload[];
}

export interface ISearchCategories {
  searchTerm?: string;
  displayInHeader?: string;
}
