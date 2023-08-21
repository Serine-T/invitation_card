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
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@features/app/hooks';
import { addCategory, editCategory } from '@features/categories/actions';
import { ICategories } from '@features/categories/types';

import {
  AddBannerSchema,
  IAddBannerForm,
  inputsRows,
  defaultValues,
} from './helpers';

interface IInputsTable{
  categoriesData?: ICategories;
}

const InputsTable = ({ categoriesData }: IInputsTable) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const methods = useForm<IAddBannerForm>({
    resolver: yupResolver(AddBannerSchema),
    defaultValues: categoriesData ?? defaultValues,
  });

  const {
    handleSubmit,
    setError,
  } = methods;

  const onSubmit = async (data: IAddBannerForm) => {
    await dispatch(categoriesData ? editCategory(data) : addCategory(data)).unwrap().then(() => {
      navigate(PAGE_ROUTES.MENU_CATEGORIES);
    }).catch((e) => {
      if (e.message === 'Category with the provided title already exists!') {
        setError('title', { message: e.message });
      }
    });
  };

  return (
    <TitlesWithBackButton title={categoriesData ? 'Edit Category' : 'Add Category'} path={PAGE_ROUTES.MENU_CATEGORIES}>
      <FormProvider {...methods}>
        <StyledStack
          onSubmit={handleSubmit(onSubmit)}
          component="form"
        >
          <StyledTable tableTitle="CATEGORY" colSpan={2}>
            {inputsRows.map((item) => {
              const { label } = item;

              return (
                <StyledTableRow key={label}>
                  <StyledTableCell>{`${label}:`}</StyledTableCell>
                  <TableCell>
                    <ReusableFields {...item} />
                  </TableCell>
                </StyledTableRow>
              );
            })}
          </StyledTable>
          <StyledButton type="submit">Submit</StyledButton>
        </StyledStack>
      </FormProvider>
    </TitlesWithBackButton>
  );
};

export default memo(InputsTable);
