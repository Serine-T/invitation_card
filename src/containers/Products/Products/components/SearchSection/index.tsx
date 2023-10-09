import { memo } from 'react';

import StyledSearchSection from '@containers/common/StyledSearchContainer';
import Input from '@containers/common/Input';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { StyledSearchRows } from '@containers/common/StyledSearchContainer/styled';
import Select from '@containers/common/Select';
import Stack from '@mui/material/Stack';
import PAGE_ROUTES from '@routes/routingEnum';
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import { constructQueryString, getOptionsArray } from '@utils/helpers';
import { useAppSelector } from '@features/app/hooks';
import SearchBtn from '@containers/common/SearchSection/SearchBtn';
import { selectSubcategories } from '@features/subcategories/selectors';

import { FiltersSchema, IFiltersForm, visibilityOptions } from './helpers';

const SearchSection = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const params = queryString.parse(search);
  const { searchTerm = '', visibleOnSite = '', subCategoryId = '' } = params;
  const { data: subcategories } = useAppSelector(selectSubcategories);
  const categoriesList = getOptionsArray(subcategories);
  const methods = useForm<IFiltersForm>({
    resolver: yupResolver(FiltersSchema),
    defaultValues: {
      searchTerm: searchTerm as string,
      visibleOnSite: visibleOnSite as string,
      subCategoryId: subCategoryId as string,
    },
  });

  const {
    handleSubmit,
    register,
  } = methods;

  const onSubmit = (data: IFiltersForm) => {
    const queryParams = constructQueryString({
      searchTerm: data.searchTerm,
      visibleOnSite: data.visibleOnSite,
      subCategoryId: data.subCategoryId,
    });

    navigate(`${PAGE_ROUTES.PRODUCTS_PRODUCTS}?${queryParams}`);
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
              label="Subcategory"
              width="200px"
              name="subCategoryId"
              options={categoriesList}
            />
            <Select
              label="Visible on site"
              width="200px"
              name="visibleOnSite"
              options={visibilityOptions}
            />
          </StyledSearchRows>
          <SearchBtn path={PAGE_ROUTES.PRODUCTS_PRODUCTS} />
        </Stack>
      </FormProvider>
    </StyledSearchSection>
  );
};

export default memo(SearchSection);
