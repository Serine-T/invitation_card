import * as yup from 'yup';

export interface IFiltersForm {
  searchTerm?: string;
  templateCategory?:string;
}

export const FiltersSchema = yup.object().shape({
});
