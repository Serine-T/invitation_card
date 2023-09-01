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
import { useAppDispatch, useAppSelector } from '@features/app/hooks';
import { IAttributeCategory } from '@features/attributeCategories/types';
import { selectAttributeCategories } from '@features/attributeCategories/selectors';
import { addAttributeCategory, editAttributeCategory } from '@features/attributeCategories/actions';

import {
  AddDataSchema,
  IAddDataForm,
  inputsRows,
  defaultValues,
} from './helpers';

interface IInputsTable{
  attributeCategoriesData?: IAttributeCategory;
}

const InputsTable = ({ attributeCategoriesData }: IInputsTable) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { actionLoading } = useAppSelector(selectAttributeCategories);
  const methods = useForm<IAddDataForm>({
    resolver: yupResolver(AddDataSchema),
    defaultValues: attributeCategoriesData ?? defaultValues,
  });

  const {
    handleSubmit,
    setError,
  } = methods;

  const onSubmit = (data: IAddDataForm) => {
    dispatch(attributeCategoriesData ? editAttributeCategory(data) : addAttributeCategory(data)).unwrap().then(() => {
      navigate(PAGE_ROUTES.ATTRIBUTE_CATEGORIES);
    }).catch((e) => {
      if (e.message === 'Attribute category with provided name already exists!') {
        setError('name', { message: e.message });
      } else {
        navigate(PAGE_ROUTES.ATTRIBUTE_CATEGORIES);
      }
    });
  };

  return (
    <TitlesWithBackButton
      title={attributeCategoriesData ? 'Edit Attribute Category' : 'Add Attribute Category'}
      path={PAGE_ROUTES.ATTRIBUTE_CATEGORIES}
    >
      <FormProvider {...methods}>
        <StyledStack
          onSubmit={handleSubmit(onSubmit)}
          component="form"
        >
          <StyledTable tableTitle="ATTRIBUTE CATEGORY" colSpan={2}>
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
          <StyledButton
            type="submit"
            disabled={actionLoading}
            isLoading={actionLoading}
          >
            Submit
          </StyledButton>
        </StyledStack>
      </FormProvider>
    </TitlesWithBackButton>
  );
};

export default memo(InputsTable);
