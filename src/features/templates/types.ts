export interface IState {
  isLoading: boolean;
  actionLoading: boolean;
  data: ITemplate[];
  errorMessage: string | null;
}

export interface IAddTemplatePayload {
  id?: string;
  name: string;
  photo: string;
  subCategoryId:string ;
  templateCategoryId?:string | null;
}

export interface ITemplate {
  id: string;
  created: string;
  updated: string;
  deleted: string;
  name: string;
  description: string;
  sort: number;
}

export interface ISearchTemplates {
  searchTerm?: string;
}
