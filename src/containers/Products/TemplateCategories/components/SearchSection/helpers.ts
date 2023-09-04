import * as yup from 'yup';

export interface IFiltersForm {
  searchTerm?: string;
}

export const FiltersSchema = yup.object().shape({
});
