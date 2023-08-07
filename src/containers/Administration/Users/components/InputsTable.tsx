import { memo } from 'react';

import { useNavigate } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import TableCell from '@mui/material/TableCell';
import StyledTable from '@containers/common/Table';
import { StyledTableRow } from '@containers/common/Table/styled';
import Input from '@containers/common/Input';
import Checkbox from '@containers/common/Checkbox';
import { StyledButton, StyledStack, StyledTableCell } from '@containers/common/AddEditTablesStyles/styled';
import { useAppDispatch, useAppSelector } from '@features/app/hooks';
import { selectUsers } from '@features/users/selectors';
import Loader from '@containers/common/Loader';
import { addUser } from '@features/users/actions';
import PAGE_ROUTES from '@routes/routingEnum';
import { Permissions } from '@features/users/types';

import {
  AddUserSchema,
  IAddUserForm,
  checkboxRows,
  inputsRows,
  defaultValues,
} from './helpers';

const InputsTable = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading } = useAppSelector(selectUsers);
  const methods = useForm<IAddUserForm>({
    resolver: yupResolver(AddUserSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  console.log('errors*****', errors);

  // TODO: add logic, remove consoles, payload
  const onSubmit = async (data: IAddUserForm) => {
    console.log('data', data);

    const payload = {
      email: 'string',
      password: 'string',
      username: 'string',
      firstName: 'string',
      lastName: 'string',
      permissions: [Permissions.PRODUCTION],
    };

    await dispatch(addUser(payload)).unwrap().then(() => {
      console.log('********then');
      navigate(PAGE_ROUTES.USERS);
    }).catch((e) => {
      console.log('ee*******', e);

      // setError('password', { message: e.message })
    });
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <FormProvider {...methods}>
        <StyledStack
          onSubmit={handleSubmit(onSubmit)}
          component="form"
        >
          <StyledTable tableTitle="USER INFO" colSpan={2}>
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
