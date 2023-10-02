import { memo } from 'react';

import Input from '@containers/common/Input';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { StyledSearchRows } from '@containers/common/StyledSearchContainer/styled';
import Stack from '@mui/material/Stack';
import PAGE_ROUTES from '@routes/routingEnum';
import { useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import { constructQueryString } from '@utils/helpers';
import SearchBtn from '@containers/common/SearchSection/SearchBtn';
import Typography from '@mui/material/Typography';
import StyledTypography from '@containers/common/StyledTypography';

import { FiltersSchema, IFiltersForm } from './helpers';

const SearchSection = () => {
  const navigate = useNavigate();
  const params = queryString.parse(window.location.search);
  const { searchTerm = '', visibleOnSite = '', subCategoryId = '' } = params;
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
    <>
      <Typography variant="h9">Assign Product Attributes</Typography>
      <StyledTypography variant="h9" color="grey">
        A-Frame (Signicade® Deluxe) 24x36 A-Frame Replacement Prints Only(1 Front & 1 Back) Frame Not Included
      </StyledTypography>
      <FormProvider {...methods}>
        <Stack
          onSubmit={handleSubmit(onSubmit)}
          component="form"
          gap="24px"
          mt="40px"
        >
          <StyledSearchRows>
            <Input
              {...register('searchTerm')}
              width="200px"
              label="Search"
              placeholder="Search"
            />
          </StyledSearchRows>
          <SearchBtn path={PAGE_ROUTES.PRODUCTS_PRODUCTS} />
        </Stack>
      </FormProvider>
    </>
  );
};

export default memo(SearchSection);
