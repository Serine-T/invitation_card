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
export interface Template {
  id: string;
  name: string;
  sort: number;
  templateCategory: {
    id: string;
    name: string;
  } | null;
}
export interface ITemplate {
  id: string;
  title: string;
  templates: Template[];
}

export interface ISearchTemplates {
  searchTerm?: string;
}
