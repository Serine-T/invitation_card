import { memo } from 'react';

import Input from '@containers/common/Input';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Stack from '@mui/material/Stack';
import queryString from 'query-string';
import { constructQueryString } from '@utils/helpers';
import Typography from '@mui/material/Typography';
import StyledTypography from '@containers/common/StyledTypography';
import Button from '@containers/common/Button';

import { FiltersSchema, IFiltersForm } from './helpers';

const SearchSection = () => {
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

    console.log('queryParams-***', queryParams);
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
          direction="row"
          gap="24px"
          mt="40px"
          alignItems="flex-end"
        >
          <Input
            {...register('searchTerm')}
            width="300px"
            placeholder="Find Attribute"
          />
          <Button width="120px" type="submit">Search</Button>
        </Stack>
      </FormProvider>
    </>
  );
};

export default memo(SearchSection);
