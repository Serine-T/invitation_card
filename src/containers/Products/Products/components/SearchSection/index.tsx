import { memo } from 'react';

import StyledSearchSection from '@containers/common/StyledSearchContainer';
import Input from '@containers/common/Input';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { StyledSearchRows } from '@containers/common/StyledSearchContainer/styled';
import Select from '@containers/common/Select';
import Stack from '@mui/material/Stack';
import PAGE_ROUTES from '@routes/routingEnum';
import { useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import { constructQueryString, getOptionsArray } from '@utils/helpers';
import { useAppSelector } from '@features/app/hooks';
import { selectCategories } from '@features/categories/selectors';
import SearchBtn from '@containers/common/SearchSection/SearchBtn';

import { FiltersSchema, IFiltersForm, visibilityOptions } from './helpers';

const SearchSection = () => {
  const navigate = useNavigate();
  const params = queryString.parse(window.location.search);
  const { searchTerm = '', visibleOnSite = '', category = '' } = params;
  const { data: categories } = useAppSelector(selectCategories);
  const categoriesList = getOptionsArray(categories);
  const methods = useForm<IFiltersForm>({
    resolver: yupResolver(FiltersSchema),
    defaultValues: {
      searchTerm: searchTerm as string,
      visibleOnSite: visibleOnSite as string,
      category: category as string,
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
      visibleOnSite: data.visibleOnSite,
      category: data.category,
    });

    navigate(`${PAGE_ROUTES.PRODUCTS}?${queryParams}`);
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
              label="Category"
              width="200px"
              name="category"
              errorMessage={errors?.category?.message}
              options={categoriesList}
            />
            <Select
              label="Visible on site"
              width="200px"
              name="visibleOnSite"
              errorMessage={errors?.visibleOnSite?.message}
              options={visibilityOptions}
            />
            <Select
              label="Spot Light"
              width="200px"
              name="visibleOnSite"
              errorMessage={errors?.visibleOnSite?.message}
              options={visibilityOptions}
            />
          </StyledSearchRows>
          <SearchBtn path={PAGE_ROUTES.PRODUCTS} />
        </Stack>
      </FormProvider>
    </StyledSearchSection>
  );
};

export default memo(SearchSection);
