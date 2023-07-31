import { memo } from 'react';

import TitlesWithBackButton from '@containers/common/TitlesWithBackButton';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import TableCell from '@mui/material/TableCell';
import StyledTable from '@containers/common/Table';
import { StyledTableRow } from '@containers/common/Table/styled';
import Input from '@containers/common/Input';

import { AddUserSchema, IAddUserForm, rows } from './helpers';
import { StyledStack } from './styles';

interface IInputsTable {
  title: string;
}

const InputsTable = ({ title }: IInputsTable) => {
  const methods = useForm<IAddUserForm>({
    resolver: yupResolver(AddUserSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const {
    handleSubmit,
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
              {rows.map(({ label }) => (
                <StyledTableRow key={label}>
                  <TableCell sx={{ width: '232px', fontWeight: 500 }}>{`${label}:`}</TableCell>
                  <TableCell>
                    <Input placeholder={label} />
                  </TableCell>
                </StyledTableRow>
              ))}
            </StyledTable>
          </StyledStack>
        </FormProvider>
      </TitlesWithBackButton>
    </>
  );
};

export default memo(InputsTable);
