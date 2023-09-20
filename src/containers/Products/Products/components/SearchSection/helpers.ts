import * as yup from 'yup';

export interface IFiltersForm {
  searchTerm?: string;
  visibleOnSite?: string;
  subCategoryId?: string;
  showInSpotlight?: string;
}

export const FiltersSchema = yup.object().shape({
});

export const visibilityOptions = [
  {
    optionName: 'Visible',
    value: 'true',
  }, {
    optionName: 'Not visible',
    value: 'false',
  },
];
