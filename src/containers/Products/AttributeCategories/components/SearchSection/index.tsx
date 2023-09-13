import { memo } from 'react';

import StyledSearchSection from '@containers/common/StyledSearchContainer';
import Input from '@containers/common/Input';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { StyledSearchRows } from '@containers/common/StyledSearchContainer/styled';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import PAGE_ROUTES from '@routes/routingEnum';
import { constructQueryString } from '@utils/helpers';
import SearchBtn from '@containers/common/SearchSection/SearchBtn';

import {
  FiltersSchema, IFiltersForm,
} from './helpers';

const SearchSection = () => {
  const navigate = useNavigate();
  const params = queryString.parse(window.location.search);

  const methods = useForm<IFiltersForm>({
    resolver: yupResolver(FiltersSchema),
    defaultValues: params,
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  // TODO: search section
  const onSubmit = (data: IFiltersForm) => {
    const queryParams = constructQueryString({ ...data });

    navigate(`${PAGE_ROUTES.ATTRIBUTE_CATEGORIES}?${queryParams}`);
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
          </StyledSearchRows>
          <SearchBtn path={PAGE_ROUTES.ATTRIBUTE_CATEGORIES} />
        </Stack>
      </FormProvider>
    </StyledSearchSection>
  );
};

export default memo(SearchSection);
