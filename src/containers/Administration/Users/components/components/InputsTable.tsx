import { memo } from 'react';

import TitlesWithBackButton from '@containers/common/TitlesWithBackButton';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import TableCell from '@mui/material/TableCell';
import StyledTable from '@containers/common/Table';
import { StyledTableRow } from '@containers/common/Table/styled';
import Input from '@containers/common/Input';

import {
  AddUserSchema,
  IAddUserForm,
  checkboxRows,
  inputsRows,
  defaultValues,
} from './helpers';
import { StyledButton, StyledStack, StyledTableCell } from './styles';

interface IInputsTable {
  title: string;
}

const InputsTable = ({ title }: IInputsTable) => {
  const methods = useForm<IAddUserForm>({
    resolver: yupResolver(AddUserSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  // TODO: add logic, remove consoles
  const onSubmit = (data: IAddUserForm) => {
    console.log('data', data);
  };

  console.log('errors', errors);

  return (
    <>
      <TitlesWithBackButton title={title}>
        <FormProvider {...methods}>
          <StyledStack
            onSubmit={handleSubmit(onSubmit)}
            component="form"
          >
            <StyledTable tableTitle="USER INFO" colSpan={2} hasPagination={false}>
              {inputsRows.map(({ label, field }) => (
                <StyledTableRow key={label}>
                  <StyledTableCell>{`${label}:`}</StyledTableCell>
                  <TableCell>
                    <Input placeholder={label} {...register(field)} />
                  </TableCell>
                </StyledTableRow>
              ))}
              {checkboxRows.map(({ label, field }) => (
                <StyledTableRow key={label}>
                  <StyledTableCell>{`${label}:`}</StyledTableCell>
                  <TableCell>
                    <Input placeholder={label} {...register(field)} />
                  </TableCell>
                </StyledTableRow>
              ))}
            </StyledTable>
            <StyledButton type="submit">Submit</StyledButton>
          </StyledStack>
        </FormProvider>

      </TitlesWithBackButton>
    </>
  );
};

export default memo(InputsTable);
