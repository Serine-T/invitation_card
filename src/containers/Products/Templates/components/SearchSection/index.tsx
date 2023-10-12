import { memo } from 'react';

import StyledSearchSection from '@containers/common/StyledSearchContainer';
import Input from '@containers/common/Input';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { StyledSearchRows } from '@containers/common/StyledSearchContainer/styled';
import Stack from '@mui/material/Stack';
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import PAGE_ROUTES from '@routes/routingEnum';
import { constructQueryString, getOptionsArray } from '@utils/helpers';
import Select from '@containers/common/Select';
import { useAppSelector } from '@features/app/hooks';
import { selectTemplateCategories } from '@features/templateCategories/selectors';
import SearchBtn from '@containers/common/SearchSection/SearchBtn';

import { FiltersSchema, IFiltersForm } from './helpers';

const SearchSection = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const params = queryString.parse(search);
  const { data: templateCategories } = useAppSelector(selectTemplateCategories);

  const templateCategoriesList = getOptionsArray(templateCategories, 'name');

  const { searchTerm = '', templateCategory = '' } = params;

  const methods = useForm<IFiltersForm>({
    resolver: yupResolver(FiltersSchema),
    defaultValues: {
      searchTerm: searchTerm as string,
      templateCategory: templateCategory as string,
    },
  });

  const { handleSubmit, register, formState: { errors } } = methods;

  const onSubmit = (data: IFiltersForm) => {
    const queryParams = constructQueryString({ ...data });

    navigate(`${PAGE_ROUTES.TEMPLATES}?${queryParams}`);
  };

  return (
    <StyledSearchSection>
      <FormProvider {...methods}>
        <Stack
          onSubmit={handleSubmit(onSubmit)}
          component="form"
          gap="24px"
        >
          <StyledSearchRows>
            <Input
              {...register('searchTerm')}
              width="200px"
              label="Search"
              placeholder="Search"
              errorMessage={errors?.searchTerm?.message}
            />
            <Select
              label="Template Category"
              width="200px"
              name="templateCategory"
              options={templateCategoriesList}
            />
          </StyledSearchRows>
          <SearchBtn path={PAGE_ROUTES.TEMPLATES} />
        </Stack>
      </FormProvider>
    </StyledSearchSection>
  );
};

export default memo(SearchSection);
