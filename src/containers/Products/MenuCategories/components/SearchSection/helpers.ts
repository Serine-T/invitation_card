import * as yup from 'yup';

export interface IFiltersForm {
  search: string;
  visibleOnSite: string;
}

export const defaultValues = {
  search: '',
  visibleOnSite: 'All',
};

export const FiltersSchema = yup.object().shape({
  search: yup.string().required('Search is required'),
  visibleOnSite: yup.string().required('Username is required'),
});
