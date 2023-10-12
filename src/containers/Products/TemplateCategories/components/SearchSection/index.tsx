import { memo } from 'react';

import StyledSearchSection from '@containers/common/StyledSearchContainer';
import Input from '@containers/common/Input';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { StyledSearchRows } from '@containers/common/StyledSearchContainer/styled';
import Stack from '@mui/material/Stack';
import Button from '@containers/common/Button';
import StyledTypography from '@containers/common/StyledTypography';
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import PAGE_ROUTES from '@routes/routingEnum';
import { constructQueryString } from '@utils/helpers';

import {
  FiltersSchema, IFiltersForm,
} from './helpers';

const SearchSection = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const params = queryString.parse(search);

  const { searchTerm = '' } = params;

  const methods = useForm<IFiltersForm>({
    resolver: yupResolver(FiltersSchema),
    defaultValues: {
      searchTerm: searchTerm as string,
    },
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  const onSubmit = (data: IFiltersForm) => {
    const queryParams = constructQueryString({
      searchTerm: data.searchTerm,
    });

    navigate(`${PAGE_ROUTES.TEMPLATE_CATEGORIES}?${queryParams}`);
  };

  const handleReset = () => {
    navigate(`${PAGE_ROUTES.TEMPLATE_CATEGORIES}`);
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
          <Stack direction="row" gap="16px" alignItems="center">
            <Button width="120px" type="submit">Search</Button>
            <StyledTypography
              onClick={handleReset}
              color="grey"
              variant="body3"
            >
              Reset Filters
            </StyledTypography>
          </Stack>
        </Stack>
      </FormProvider>
    </StyledSearchSection>
  );
};

export default memo(SearchSection);
