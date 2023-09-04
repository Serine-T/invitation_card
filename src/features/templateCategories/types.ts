export interface IState {
  isLoading: boolean;
  actionLoading: boolean;
  data: ITemplateCategory[];
  errorMessage: string | null;
}

export interface IAddTemplateCategoryPayload {
  id?: string;
  name: string;
  description: string;
}

export interface ITemplateCategory {
  id: string;
  created: string;
  updated: string;
  deleted: string;
  name: string;
  description: string;
  sort: number;
}

export interface ISearchTemplateCategories {
  searchTerm?: string;
}
