import { memo } from 'react';

import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import TableCell from '@mui/material/TableCell';
import StyledTable from '@containers/common/Table';
import { StyledTableRow } from '@containers/common/Table/styled';
import Input from '@containers/common/Input';
import Checkbox from '@containers/common/Checkbox';
import { StyledButton, StyledStack, StyledTableCell } from '@containers/common/AddEditTablesStyles/styled';

import {
  AddUserSchema,
  IAddUserForm,
  checkboxRows,
  inputsRows,
  defaultValues,
} from './helpers';

const InputsTable = () => {
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

  return (
    <>
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
                  <Input placeholder={label} {...register(field)} errorMessage={errors?.[field]?.message} />
                </TableCell>
              </StyledTableRow>
            ))}
            {checkboxRows.map(({ label, field }) => (
              <StyledTableRow key={label}>
                <StyledTableCell>{`${label}:`}</StyledTableCell>
                <TableCell>
                  <Checkbox name={field} />
                </TableCell>
              </StyledTableRow>
            ))}
          </StyledTable>
          <StyledButton type="submit">Submit</StyledButton>
        </StyledStack>
      </FormProvider>
    </>
  );
};

export default memo(InputsTable);
