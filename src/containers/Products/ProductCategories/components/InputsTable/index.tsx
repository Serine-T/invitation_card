import { memo } from 'react';

import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import TableCell from '@mui/material/TableCell';
import StyledTable from '@containers/common/Table';
import { StyledTableRow } from '@containers/common/Table/styled';
import { StyledButton, StyledStack, StyledTableCell } from '@containers/common/StyledAddEditTables/styled';
import TitlesWithBackButton from '@containers/common/TitlesWithBackButton';
import PAGE_ROUTES from '@routes/routingEnum';
import ReusableFields from '@containers/common/ReusableFields';

import {
  AddSubcategorySchema,
  IAddSubcategoryForm,
  defaultValues,
  inputsRows1,
  inputsRows2,
  printTypeValues,
} from './helpers';
import StaticShipping from './StaticShipping';
import SEO from './SEO';

interface IInputsTable{
  productCategoriesData?: any;
}

const InputsTable = ({ productCategoriesData }: IInputsTable) => {
  const methods = useForm<IAddSubcategoryForm>({
    resolver: yupResolver(AddSubcategorySchema),
    defaultValues,
  });

  const {
    handleSubmit,
  } = methods;

  const onSubmit = (data: IAddSubcategoryForm) => {
    console.log('data', data);
  };

  return (
    <TitlesWithBackButton
      title={productCategoriesData ? 'Edit Subcategory' : 'Add Subcategory'}
      path={PAGE_ROUTES.MENU_CATEGORIES}
    >
      <FormProvider {...methods}>
        <StyledStack
          onSubmit={handleSubmit(onSubmit)}
          component="form"
        >

          <StyledTable tableTitle="SUBCATEGORY" colSpan={2}>
            {inputsRows1.map((item) => {
              const { label } = item;

              return (
                <StyledTableRow key={label}>
                  <StyledTableCell>{label}</StyledTableCell>
                  <TableCell>
                    <ReusableFields
                      {...item}
                      selectList={[{
                        field: 'categoryId',
                        options: ['Marketing Products', 'Grand Format'],
                      }, {
                        field: 'printType',
                        options: printTypeValues,
                      }]}
                    />
                  </TableCell>
                </StyledTableRow>
              );
            })}
            <StaticShipping />

            {inputsRows2.map((item) => {
              const { label } = item;

              return (
                <StyledTableRow key={label}>
                  <StyledTableCell>{label}</StyledTableCell>
                  <TableCell>
                    <ReusableFields {...item} />
                  </TableCell>
                </StyledTableRow>
              );
            })}
          </StyledTable>
          <SEO />
          <StyledButton type="submit">Submit</StyledButton>
        </StyledStack>
      </FormProvider>
    </TitlesWithBackButton>
  );
};

export default memo(InputsTable);
