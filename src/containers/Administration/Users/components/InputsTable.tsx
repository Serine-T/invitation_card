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
import { useAppDispatch } from '@features/app/hooks';
import { addUser } from '@features/users/actions';
import PAGE_ROUTES from '@routes/routingEnum';

import {
  AddUserSchema,
  IAddUserForm,
  checkboxRows,
  inputsRows,
  defaultValues,
  formattingPayload,
} from './helpers';

// TODO: change any typing
const InputsTable = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const methods = useForm<IAddUserForm>({
    resolver: yupResolver(AddUserSchema as any),
    defaultValues,
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
  } = methods;

  const onSubmit = async (data: IAddUserForm) => {
    const payload = formattingPayload(data);

    await dispatch(addUser(payload)).unwrap().then(() => {
      navigate(PAGE_ROUTES.USERS);
    }).catch((e) => {
      setError('email', { message: e.message });
    });
  };

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
                  <Input
                    type={field === 'password' ? 'password' : 'text'}
                    placeholder={label}
                    {...register(field)}
                    errorMessage={errors?.[field]?.message}
                    inputProps={
                     { autoComplete: 'new-password' }
                    }
                  />
                </TableCell>
              </StyledTableRow>
            ))}
            {checkboxRows.map(({ label, field }) => (
              <StyledTableRow key={label}>
                <StyledTableCell>{`${label}:`}</StyledTableCell>
                <TableCell>
                  <Checkbox name={`permissions[${field}]`} />
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
