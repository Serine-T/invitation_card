import { memo } from 'react';

import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import TableCell from '@mui/material/TableCell';
import StyledTable from '@containers/common/Table';
import { StyledTableRow } from '@containers/common/Table/styled';
import Input from '@containers/common/Input';
import Checkbox from '@containers/common/Checkbox';
import Upload from '@containers/common/Upload';

import {
  AddBannerSchema,
  IAddBannerForm,
  inputsRows,
  defaultValues,
} from './helpers';
import { StyledButton, StyledStack, StyledTableCell } from './styles';

const InputsTable = () => {
  const methods = useForm<IAddBannerForm>({
    resolver: yupResolver(AddBannerSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  // TODO: add logic, remove consoles
  const onSubmit = (data: IAddBannerForm) => {
    console.log('data', data);
  };

  return (
    <>
      <FormProvider {...methods}>
        <StyledStack
          onSubmit={handleSubmit(onSubmit)}
          component="form"
        >
          <StyledTable tableTitle="BANNER" colSpan={2} hasPagination={false}>
            <StyledTableRow>
              <StyledTableCell>Photo (Desktop):</StyledTableCell>
              <TableCell>
                <Upload id="ss">
                  Photo
                </Upload>
              </TableCell>
            </StyledTableRow>
            {inputsRows.map(({ label, field }) => (
              <StyledTableRow key={label}>
                <StyledTableCell>{`${label}:`}</StyledTableCell>
                <TableCell>
                  <Input placeholder={label} {...register(field)} errorMessage={errors?.[field]?.message} />
                </TableCell>
              </StyledTableRow>
            ))}
            {/* TODO: HOMEPAGE change checkbox name */}
            <StyledTableRow>
              <StyledTableCell>Display on Site</StyledTableCell>
              <TableCell>
                <Checkbox name="visibility" />
              </TableCell>
            </StyledTableRow>
          </StyledTable>
          <StyledButton type="submit">Submit</StyledButton>
        </StyledStack>
      </FormProvider>
    </>
  );
};

export default memo(InputsTable);
