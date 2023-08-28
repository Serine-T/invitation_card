import { memo } from 'react';

import StyledSearchSection from '@containers/common/StyledSearchContainer';
import Input from '@containers/common/Input';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { StyledSearchRows } from '@containers/common/StyledSearchContainer/styled';
import Select from '@containers/common/Select';
import Stack from '@mui/material/Stack';
import Button from '@containers/common/Button';
import StyledTypography from '@containers/common/StyledTypography';

import { FiltersSchema, IFiltersForm, defaultValues, visibilityOptions } from './helpers';

const SearchSection = () => {
  const methods = useForm<IFiltersForm>({
    resolver: yupResolver(FiltersSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = methods;

  const onSubmit = (data: IFiltersForm) => {
    console.log('data****', data);
  };

  const handleReset = () => {
    reset();
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
              {...register('search')}
              width="200px"
              label="Search"
              placeholder="Search"
              errorMessage={errors?.search?.message}
            />
            <Select
              label="Visible on site"
              width="200px"
              id="visibleOnSite"
              name="visibleOnSite"
              errorMessage={errors?.visibleOnSite?.message}
              options={visibilityOptions}
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
