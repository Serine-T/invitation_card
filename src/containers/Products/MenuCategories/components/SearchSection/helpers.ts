import * as yup from 'yup';

export interface IFiltersForm {
  searchTerm?: string;
  displayInHeader?: string;
}

export const defaultValues = {
  searchTerm: '',
  displayInHeader: '',
};

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
