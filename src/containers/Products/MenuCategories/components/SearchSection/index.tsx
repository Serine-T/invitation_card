import { memo } from 'react';

import StyledSearchSection from '@containers/common/StyledSearchContainer';
import Input from '@containers/common/Input';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { StyledSearchRows } from '@containers/common/StyledSearchContainer/styled';
import Select from '@containers/common/Select';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import PAGE_ROUTES from '@routes/routingEnum';
import { constructQueryString } from '@utils/helpers';
import SearchBtn from '@containers/common/SearchSection/SearchBtn';

import {
  FiltersSchema, IFiltersForm,
  visibilityOptions,
} from './helpers';

const SearchSection = () => {
  const navigate = useNavigate();
  const params = queryString.parse(window.location.search);

  const { searchTerm = '', displayInHeader = '' } = params;

  const methods = useForm<IFiltersForm>({
    resolver: yupResolver(FiltersSchema),
    defaultValues: {
      searchTerm: searchTerm as string,
      displayInHeader: displayInHeader as string,
    },
  });

  const {
    handleSubmit,
    register,
  } = methods;

  const onSubmit = (data: IFiltersForm) => {
    const queryParams = constructQueryString({
      searchTerm: data.searchTerm,
      displayInHeader: data.displayInHeader,
    });

    navigate(`${PAGE_ROUTES.MENU_CATEGORIES}?${queryParams}`);
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
            />
            <Select
              label="Visible on site"
              width="200px"
              name="displayInHeader"
              options={visibilityOptions}
            />
          </StyledSearchRows>
          <SearchBtn path={PAGE_ROUTES.MENU_CATEGORIES} />
        </Stack>
      </FormProvider>
    </StyledSearchSection>
  );
};

export default memo(SearchSection);
