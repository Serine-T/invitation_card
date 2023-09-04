import * as yup from 'yup';

export interface IFiltersForm {
  searchTerm?: string;
  displayInHeader?: string;
}

export const FiltersSchema = yup.object().shape({
});
